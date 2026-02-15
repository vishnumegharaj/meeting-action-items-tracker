import dotenv from 'dotenv';
import { GoogleGenAI } from "@google/genai";

dotenv.config();

// Initialize the client
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const systemPrompt = `You are an expert at analyzing meeting transcripts. Extract action items as a JSON array. 
If there are no action items, return an empty array: []
`
// - "tomorrow" → next day's date
// - "Monday", "Tuesday", etc. → next occurrence of that weekday
// - "next week" → 7 days from today
// - "end of week" → upcoming Friday
// - "end of month" → last day of current month
// - "EOD", "today" → today's date
// - "Feb 20", "March 15" → convert to DD-MM-YYYY (assume current year)
export async function extractActionItems(transcript) {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        {
          role: 'user',
          parts: [{ text: `Analyze this meeting transcript and extract action items: ${transcript}` }]
        }
      ],
      config: {
        // SYSTEM INSTRUCTIONS: Tells Gemini how to behave
        systemInstruction: systemPrompt,

        // STRUCTURED OUTPUT: Forces Gemini to return valid JSON only
        responseMimeType: "application/json",
        responseSchema: {
          type: "array",
          items: {
            type: "object",
            properties: {
              task: { type: "string" },
              owner: { type: "string", nullable: true },
              due_date: { type: "string", nullable: true }
            },
            required: ["task"]
          }
        },
        temperature: 0.2 // Keep it focused for data extraction
      }
    });

    // Gemini's SDK returns the object directly if responseMimeType is set
    // No need for regex or manual JSON.parse!
    const actionItems = response.candidates[0].content.parts[0].text;
    const parsedItems = JSON.parse(actionItems);

    return {
      success: true,
      actionItems: Array.isArray(parsedItems) ? parsedItems : []
    };

  } catch (error) {
    console.error('Error extracting action items:', error);
    return {
      success: false,
      error: error.message,
      actionItems: []
    };
  }
}

export async function checkLLMHealth() {
  try {
    // We make a very small, cheap request to verify the API key and model status
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [{
        role: 'user',
        parts: [{ text: 'Reply with the word OK' }]
      }],
      config: {
        maxOutputTokens: 10,
        temperature: 0.1
      }
    });

    const resultText = response.candidates[0].content.parts[0].text.trim();

    if (resultText.includes('OK')) {
      return {
        status: 'healthy',
        model: 'gemini-2.5-flash',
        provider: 'Google'
      };
    } else {
      throw new Error("Model responded but output was unexpected.");
    }

  } catch (error) {
    console.log('Error checking LLM health:', error);
    return {
      status: 'unhealthy',
      model: 'gemini-2.5-flash',
      error: error.message
    };
  }
}
