# AI Usage Notes

## LLM Provider & Model Choice

**Provider**: Google  
**Model**: Gemini 2.5 Flash (`gemini-2.5-flash`)

### Why Google Gemini?

1. **Completely free**: No API costs, perfect for MVP and demonstration
2. **No credit card required**: Easy to get started without payment information
3. **Excellent at structured extraction**: Superior performance at extracting structured data from unstructured text
4. **Fast responses**: 1-2 seconds for typical meeting transcripts
5. **Generous rate limits**: 60 requests per minute, more than sufficient for this use case
6. **Native JSON mode**: Supports `responseMimeType: "application/json"` for guaranteed valid output
7. **Latest technology**: Gemini 2.5 generation with improved accuracy

### Why Gemini 2.5 Flash Specifically?

- **Speed**: Optimized for fast inference while maintaining quality
- **Quality**: Better than Gemini 1.5 models for structured tasks
- **Cost**: Completely free with generous limits
- **Reliability**: Stable enough for production despite "experimental" tag
- **JSON Schema Support**: Can enforce exact output structure

### Alternatives Considered

**Anthropic Claude:**
- Excellent quality but requires paid API access
- Would add cost barrier for portfolio demonstration

**OpenAI GPT:**
- No longer offers free credits for new users
- Requires payment method setup

**Decision**: Gemini 2.5 Flash provides the best balance of quality, speed, and accessibility for this project.

---

## AI Tools Used During Development

### 1. **Claude (Anthropic) - via Claude.ai**
   - **What I used it for**: 
     - Initial architecture planning and tech stack decisions
     - Code generation for both frontend and backend components
     - Debugging complex issues (date conversion, API integration)
     - Writing comprehensive documentation
     - Suggesting best practices and project structure
     - Creating test cases and sample data
   
   - **What I checked myself**:
     - All API endpoints tested manually with Postman
     - Database schema verified for proper relationships and indexes
     - Error handling tested with various edge cases
     - Frontend components rendered correctly in browser
     - Routing tested for all navigation paths
     - CSS/styling checked across different screen sizes
     - Environment variable setup verified
     - Security considerations (no API keys in code, CORS properly configured)
     - Date conversion logic tested with multiple scenarios
     - SQLite queries tested for correctness and performance

### 2. **TRAE AI Code Editor**
   - **What I used it for**:
     - Real-time code suggestions and auto-completion
     - Refactoring existing code for better readability
     - Quick bug fixes and syntax corrections
     - Generating boilerplate code (imports, function signatures)
     - Inline documentation and comments
   
   - **What I checked myself**:
     - All TRAE suggestions reviewed before accepting
     - Code tested after refactoring to ensure functionality
     - Verified that auto-generated code follows project conventions
     - Checked for potential bugs introduced by AI suggestions

### 3. **Google Gemini API** (In Production)
   - **What it does**:
     - Parses meeting transcripts
     - Extracts action items with tasks, owners, and due dates
     - Converts relative dates to absolute DD-MM-YYYY format
   
   - **How I ensured quality**:
     - Tested with 8+ different transcript scenarios
     - Validated JSON output parsing
     - Verified date conversion accuracy
     - Tested edge cases (no action items, long transcripts, etc.)

---

## Code I Wrote vs AI-Assisted

### Entirely AI-Assisted (but thoroughly verified):
- Initial project boilerplate structure
- Tailwind CSS utility classes and styling
- Basic CRUD operation templates
- Database schema initial design
- React component scaffolding

### Heavily Modified/Customized by Me:
- **LLM prompt engineering**: Iterated multiple times to perfect date conversion
- **Error handling logic**: Added comprehensive try-catch blocks and user feedback
- **API response formats**: Customized for frontend needs
- **Component state management**: Refined for better user experience
- **Edge case handling**: Added validation for empty inputs, failed API calls, etc.
- **Date conversion logic**: Developed JavaScript helper function for accurate date mapping

### Written Entirely by Me:
- Environment configuration decisions (which variables to use)
- Deployment strategy choices (Vercel + Render)
- Testing approach and test case design
- Documentation structure and content
- Security considerations and implementation
- Final prompt optimization for Gemini API

---

## Prompt Engineering Journey

### Initial Prompt (Too Vague):
```
"Extract action items from this meeting transcript"
```
❌ Result: Inconsistent format, missed owners and dates

### Improved Prompt (Better Structure):
```
"Extract action items as JSON with task, owner, and due_date fields"
```
✅ Better but dates were in inconsistent formats ("tomorrow", "Friday")

### Current Prompt (Optimized):
```
System instruction with:
- Explicit output schema enforcement via JSON mode
- JavaScript-calculated date mappings provided to AI
- Clear examples for each date scenario
- Instruction to use exact dates provided, not calculate
```
✅ Consistent DD-MM-YYYY dates, accurate extraction, reliable output

### Key Learning:
The AI struggled to calculate dates correctly when given day names. Solution: **Calculate dates in JavaScript and provide exact mappings** rather than asking AI to compute them.

---

## Verification Process

For every AI-generated piece of code, I:

1. **Read and understood** the code completely
2. **Tested** functionality manually in browser/Postman
3. **Verified** error handling works with invalid inputs
4. **Checked** for security issues (SQL injection, XSS, exposed secrets)
5. **Ensured** code follows best practices and project conventions
6. **Modified** where necessary to fit exact requirements
7. **Documented** any changes or customizations made

---

## Testing & Validation

All AI-generated code was tested with:
- ✅ Valid inputs (normal meeting transcripts)
- ✅ Empty inputs (blank transcript)
- ✅ Malformed inputs (random text, special characters)
- ✅ Edge cases (very long transcripts, no action items, multiple dates)
- ✅ Error scenarios (API failures, network issues, invalid JSON)
- ✅ Date conversion accuracy (tomorrow, next Friday, end of month, etc.)
- ✅ Cross-browser compatibility (Chrome, Firefox, Edge)
- ✅ Responsive design (desktop, tablet, mobile)

---

## What I Learned

### About AI-Assisted Development:
1. **AI is excellent for boilerplate**: Saved significant time on repetitive code
2. **Human verification is critical**: AI can make subtle logical errors
3. **Prompt engineering matters**: Better prompts = better AI outputs (took 5+ iterations)
4. **Understanding is non-negotiable**: Must understand all code, even if AI wrote it
5. **Security requires human oversight**: AI doesn't always consider security implications
6. **Testing is essential**: AI-generated code needs comprehensive testing

### About LLM APIs:
1. **Structured output modes are powerful**: JSON schema enforcement eliminates parsing errors
2. **Date calculation is hard for LLMs**: Better to compute in code and provide values
3. **Temperature matters**: Low temperature (0.1) gives consistent extraction results
4. **System instructions are crucial**: Clear instructions in system prompt improve reliability
5. **Error handling is mandatory**: LLM APIs can fail, always have fallbacks

---

## Final Assessment

**AI Contribution**: ~60% of initial code generation  
**Human Contribution**: ~40% modifications + 100% verification, testing, and prompt optimization

The AI tools (Claude, TRAE, Gemini) significantly accelerated development, but human oversight ensured:
- ✅ Quality and correctness
- ✅ Security best practices
- ✅ Proper error handling
- ✅ Optimized user experience
- ✅ Production-ready code

---

## Gemini API Integration Details

### Why Gemini Works Well for This Task:

1. **Structured Output**: Native JSON mode with schema validation
2. **Context Window**: 1M+ tokens handles long transcripts
3. **Accuracy**: Consistently extracts all action items
4. **Speed**: <2 second response times
5. **Cost**: Free tier is more than sufficient

### Implementation Approach:

```javascript
// Provide exact date mappings calculated in JavaScript
const weekDates = getWeekDates();

// Tell Gemini to use these exact values
systemInstruction: `
  Friday → ${weekDates.Friday}
  Monday → ${weekDates.Monday}
  Use these EXACT dates. DO NOT calculate yourself.
`
```

This hybrid approach (JavaScript calculation + LLM extraction) produces the most reliable results.

---

## Conclusion

AI tools were invaluable for rapid development, but the project's success came from:
1. Strategic use of AI for appropriate tasks
2. Rigorous testing and verification
3. Human judgment for architecture decisions
4. Iterative prompt optimization
5. Comprehensive error handling

**The key is using AI as a powerful assistant, not a replacement for critical thinking and thorough testing.**
