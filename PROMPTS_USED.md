# Prompts Used During Development

This document records the key prompts I used with AI assistants (Claude and TRAE AI) during the development of this project.

---

## Initial Project Setup

### Prompt 1: Project Architecture
```
I need to build a Meeting Action Items Tracker web app for a job application. 

Requirements:
- Paste meeting transcript and extract action items using AI
- CRUD operations for action items
- Mark items as done
- Show last 5 transcripts
- System health status page
- Must work on Windows

Please suggest:
1. Tech stack (frontend, backend, database, LLM)
2. Project structure
3. Why each technology choice
4. Any Windows-specific considerations
```

**AI Used**: Claude (Claude.ai)  
**What I verified**: Checked if suggested stack works on Windows, researched alternatives, validated tech choices

---

### Prompt 2: Tech Stack Clarification
```
You suggested better-sqlite3 but I'm on Windows and don't have C++ build tools. 
What's a better alternative that has pre-built binaries for Windows?
```

**AI Used**: Claude (Claude.ai)  
**What I verified**: Tested `sqlite3` package installation on Windows, verified it works without build tools

---

## Backend Development

### Prompt 3: Database Schema Design
```
Create a SQLite database schema for the meeting tracker:

Tables needed:
- Transcripts (id, title, content, created_at)
- Action items (id, transcript_id, task, owner, due_date, status, created_at)

Requirements:
- Use sqlite3 package (not better-sqlite3)
- Proper foreign keys with cascade delete
- Indexes for performance
- Promise-based wrappers for async/await
```

**AI Used**: Trae  
**What I verified**: Tested database creation, verified foreign key constraints work, checked cascade delete behavior

---

### Prompt 4: Express API Setup
```
Create an Express.js server with these REST API endpoints:

- GET /api/health - health check for backend, database, and LLM
- GET /api/transcripts - get last 5 transcripts
- GET /api/transcripts/:id - get transcript with action items
- POST /api/transcripts - create transcript and extract items with AI
- POST /api/action-items - manually create action item
- PUT /api/action-items/:id - update action item
- DELETE /api/action-items/:id - delete action item
- DELETE /api/transcripts/:id - delete transcript

Use CORS, proper error handling, and JSON middleware.
Use sqlite3 with promise wrappers.
```

**AI Used**: Trae  
**What I verified**: Tested all endpoints with Postman, checked error handling, validated CORS settings

---

### Prompt 5: LLM Integration - Initial Version
```
Create a service to extract action items from meeting transcripts using Google Gemini API.

Requirements:
- Use @google/genai package
- Model: gemini-2.5-flash-exp
- Extract: task, owner, due_date for each action item
- Return JSON array
- Use responseMimeType: "application/json" for structured output
- Handle errors gracefully
- Include health check function
```

**AI Used**: Trae  
**What I verified**: Tested with sample transcripts, validated JSON parsing, checked API error handling

---

### Prompt 6: Date Conversion Issue
```
The AI is extracting dates but they're in inconsistent formats:
- "tomorrow"
- "Wednesday"
- "end of week"
- "Feb 20"

I need all dates in DD-MM-YYYY format. How can I fix this?
```

**AI Used**: Claude (Claude.ai)  
**What I verified**: Tested date conversion with multiple input formats

---

### Prompt 7: Date Conversion - Iteration 2
```
The date conversion isn't working correctly. When the transcript says "next Friday" 
(which should be Feb 20), the AI returns Feb 21 (Saturday). 

It's calculating dates incorrectly. How can I ensure accurate date conversion?
```

**AI Used**: Claude (Claude.ai)  
**What I verified**: Tested with known dates, compared AI output to calendar

---

## Frontend Development

### Prompt 8: React Component Structure
```
Create a React app with Vite for the meeting tracker:

Pages needed:
1. Home - show last 5 meetings, welcome section, navigation
2. NewMeeting - form to paste transcript and submit
3. TranscriptDetail - show transcript and action items with full CRUD
4. Status - system health monitoring

Use:
- React Router for navigation
- Tailwind CSS for styling
- Lucide React for icons
- Clean, modern design with gradient backgrounds
```

**AI Used**: Trae  
**What I verified**: Tested routing, checked responsive design, validated navigation flow

---

### Prompt 9: Home Page UI
```
Create a modern Home page component with:

- Header: app logo, title, "New Meeting" button
- "How it works" section with 3 illustrated steps
- Recent meetings list showing:
  * Meeting title
  * Date created
  * Action item count
  * Click to view details
- Empty state when no meetings exist
- Gradient background (blue to indigo)
- Professional, clean design
```

**AI Used**: Trae  
**What I verified**: Checked responsive design, tested empty states, verified date formatting

---

### Prompt 10: TranscriptDetail Page - Complex UI
```
Create TranscriptDetail page with split layout:

Left side: Original transcript (sticky, scrollable)
Right side: Action items with:
- Filter tabs (All/Open/Done) with counts
- Each item shows:
  * Checkbox to toggle done/open
  * Task description
  * Owner name (with icon)
  * Due date (with icon)
  * Edit button (inline editing)
  * Delete button
- "Add Item" button to create new items manually
- Empty state messages

Handle all CRUD operations with proper loading states.
```

**AI Used**: Trae 
**What I verified**: Tested all CRUD operations, checked state management, validated filtering, tested inline editing

---

### Prompt 11: Status Page Health Monitoring
```
Create a system status page showing:

- Overall health status (green/yellow/red)
- Individual service cards:
  * Backend server (status, uptime)
  * Database (status)
  * LLM service (status, provider, model)
- Refresh button to re-check
- Color-coded status indicators
- Error messages when services are down
- Info box explaining each service
```

**AI Used**: Trae  
**What I verified**: Tested health check integration, verified error states, checked refresh functionality

---

## Styling & UX

### Prompt 12: Tailwind Configuration
```
Set up Tailwind CSS with:
- Modern color scheme (indigo primary, green success, red error)
- Responsive utilities for mobile/tablet/desktop
- Smooth transitions and animations
- Loading spinner styles
- Gradient backgrounds
- Focus states for accessibility
```

**AI Used**: TRAE AI 
**What I verified**: Tested on different screen sizes, checked color contrast for accessibility

---

### Prompt 13: Error States and Validation
```
Add comprehensive error handling:

- Loading spinners during API calls
- Error messages with retry buttons
- Empty state messages with helpful CTAs
- Form validation feedback
- Toast notifications for success/error
- Network failure handling
```

**AI Used**: TRAE AI  
**What I verified**: Tested error scenarios, verified loading indicators, checked user feedback messages

---

## Debugging & Refinement

### Prompt 14: SQLite Concurrency
```
Sometimes getting "database is locked" errors when processing multiple requests.
How do I handle this with sqlite3 package?
```

**AI Used**: Claude (Claude.ai)  
**What I verified**: Tested concurrent requests, checked for race conditions

---

### Prompt 15: Prompt Optimization
```
My current Gemini prompt:
"Extract action items as a JSON array. Convert dates to DD-MM-YYYY format."

Can you improve this prompt to:
1. Be more specific about what to extract
2. Handle edge cases (no action items, implicit tasks)
3. Ensure consistent output
4. Better date conversion instructions
```

**AI Used**: Claude (Claude.ai)  
**What I verified**: Tested improved prompt with all test cases, measured accuracy improvement

---

## Documentation

### Prompt 16: README Generation
```
Create a comprehensive README.md with:

- Project description and features
- Installation instructions (step-by-step)
- How to run locally
- Project structure explanation
- Usage guide with examples
- Deployment instructions
- Technology stack details
- Testing checklist
- What's done and what's not done
```

**AI Used**: Trae AI  
**What I verified**: Followed instructions myself to ensure accuracy, tested all commands

---

### Prompt 17: Sample Test Data
```
Generate 8 sample meeting transcripts for testing:

1. Simple meeting (5 action items, clear dates)
2. Complex meeting (implicit actions, multiple people)
3. Long meeting (10+ items, multiple topics)
4. Vague meeting (no clear actions)
5. Customer support scenario
6. Very short meeting
7. No action items meeting
8. Different date formats

Make them realistic and varied.
```

**AI Used**: Claude (Claude.ai)  
**What I verified**: Used all samples to test the app, validated AI extraction quality

---

## Code Refactoring

### Prompt 18: TRAE Inline Refactoring
```
[Used TRAE's inline suggestions to:]
- Simplify nested conditionals
- Extract repeated code into functions
- Add JSDoc comments
- Improve variable naming
- Optimize imports
```

**AI Used**: TRAE AI (inline code suggestions)  
**What I verified**: Tested after each refactoring, ensured functionality unchanged

---

## Final Polish

### Prompt 19: Accessibility Check
```
Review my React components for accessibility:
- Keyboard navigation
- ARIA labels
- Focus management
- Color contrast
- Screen reader support
```

**AI Used**: TRAE AI  
**What I verified**: Tested with keyboard-only navigation, checked with accessibility DevTools

---

### Prompt 20: Performance Optimization
```
Review my code for performance issues:
- Unnecessary re-renders
- Large bundle size
- Slow API calls
- Database query optimization
- Frontend loading times
```

**AI Used**: TRAE AI  
**What I verified**: Measured before/after with browser DevTools, validated improvements

---

## Notes on Prompt Usage

### Total Prompts Used: ~30-40 (including iterations)

### Most Helpful Prompts:
1. Architecture planning (saved hours of research)
2. Date conversion solution (solved biggest technical challenge)
3. Complex component structure (TranscriptDetail page)
4. Error handling patterns

### Prompts That Needed Iteration:
1. **Date conversion** - took 3 iterations to get right
2. **LLM prompt engineering** - refined 5+ times for accuracy
3. **Database setup** - 2 iterations (switched from better-sqlite3 to sqlite3)

### Key Learnings About Prompting:
1. **Be specific**: Include exact requirements and constraints
2. **Provide context**: Mention OS, existing code, constraints
3. **Ask for explanations**: Understanding "why" helps verify
4. **Iterate**: Don't expect perfect results first try
5. **Test everything**: AI suggestions need human verification

---

## Verification Checklist

For each AI-generated solution:
- ✅ Read and understood the code
- ✅ Tested functionality manually
- ✅ Checked for edge cases
- ✅ Verified error handling
- ✅ Ensured security best practices
- ✅ Tested across browsers/devices
- ✅ Modified as needed for requirements

---

## Tools Used

1. **Claude (Claude.ai)**: Primary assistant for architecture, coding, debugging
2. **TRAE AI**: Code editor with inline suggestions and refactoring
3. **Google Gemini API**: Production LLM for action item extraction

All tools were used as assistants, not replacements for critical thinking and thorough testing.
