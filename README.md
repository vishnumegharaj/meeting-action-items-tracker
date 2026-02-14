# Meeting Action Items Tracker

An AI-powered web application that automatically extracts and manages action items from meeting transcripts using Google Gemini AI.

## 🎯 Features

- **AI-Powered Extraction**: Automatically extract action items, owners, and due dates from meeting transcripts using Google Gemini 2.5
- **Smart Date Conversion**: Converts relative dates ("tomorrow", "next Friday") to absolute DD-MM-YYYY format
- **Full CRUD Operations**: Create, Read, Update, and Delete action items
- **Status Tracking**: Mark items as open or done
- **Smart Filtering**: Filter action items by status (all/open/done)
- **Meeting History**: View your last 5 processed meeting transcripts
- **System Health Monitoring**: Real-time status page showing backend, database, and LLM health
- **Clean, Modern UI**: Built with React and Tailwind CSS for a smooth user experience
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## 🚀 Live Demo

**Frontend**: [Your Vercel URL]  
**Backend**: [Your Render/Railway URL]

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Google Gemini API key ([Get free key here](https://aistudio.google.com/app/apikey))

## 🛠️ Installation & Setup

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd meeting-tracker
```

### 2. Backend Setup

```bash
cd backend
npm install

# Create .env file from example
cp .env.example .env

# Add your Google Gemini API key to .env
# GEMINI_API_KEY=your_key_here
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install

# Create .env file (optional, default works for local dev)
cp .env.example .env
```

### 4. Run the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```
Backend will run on `http://localhost:3001`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
Frontend will run on `http://localhost:5173`

### 5. Access the Application

Open your browser and go to `http://localhost:5173`

## 📁 Project Structure

```
meeting-tracker/
├── backend/
│   ├── server.js           # Express server with REST API
│   ├── database.js         # SQLite database setup
│   ├── llmService.js       # Google Gemini AI integration
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.jsx            # Home page with meeting list
│   │   │   ├── NewMeeting.jsx      # Form to process new transcript
│   │   │   ├── TranscriptDetail.jsx # View & manage action items
│   │   │   └── Status.jsx          # System health status page
│   │   ├── App.jsx         # Main app component with routing
│   │   ├── api.js          # API utility functions
│   │   └── main.jsx        # Entry point
│   ├── index.html
│   ├── package.json
│   └── .env.example
├── README.md
├── AI_NOTES.md
├── ABOUTME.md
└── PROMPTS_USED.md
```

## 🎨 How to Use

1. **Process a Meeting**: Click "New Meeting" button
2. **Paste Transcript**: Enter your meeting transcript text (or use the "Load Example" button)
3. **AI Extraction**: The app automatically extracts action items with owners and due dates
4. **Manage Items**: 
   - Click checkmark to mark as done
   - Click edit icon to modify task, owner, or due date
   - Click trash icon to delete
   - Click "Add Item" to manually add new action items
5. **Filter**: Use filter tabs (All/Open/Done) to view specific items
6. **History**: Return to home page to see your last 5 meetings
7. **Check Health**: Click the floating status icon to view system health

## 🧪 Testing

### Manual Testing Checklist

- [x] Process a new meeting transcript
- [x] Verify AI extraction of tasks, owners, and due dates
- [x] Mark an item as done
- [x] Edit an action item
- [x] Delete an action item
- [x] Add a manual action item
- [x] Filter by status (all/open/done)
- [x] View meeting history
- [x] Check system status page
- [x] Test with empty input (shows error)
- [x] Test date conversion (tomorrow, Friday, etc.)

### Example Test Transcript

```
Team Meeting - February 14, 2026

Sarah: I've completed the design mockups. John, can you review them by Friday?

John: Sure, I'll review the mockups by end of week. Also, Mike, can you set up the staging environment?

Mike: Yes, I'll have the staging environment ready by Wednesday.
```

## 🌐 Deployment

See `DEPLOYMENT.md` for detailed deployment instructions to:
- Backend: Render / Railway / Fly.io
- Frontend: Vercel / Netlify

## ⚙️ Environment Variables

### Backend (.env)

```env
GEMINI_API_KEY=your_gemini_api_key_here
PORT=3001
FRONTEND_URL=http://localhost:5173
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:3001/api
```

## 🔧 Technology Stack

**Frontend:**
- React 18
- Vite
- React Router DOM
- Tailwind CSS
- Lucide React Icons

**Backend:**
- Node.js
- Express.js
- SQLite (sqlite3)
- Google Gemini 2.5 Flash API
- CORS

**AI Model:**
- Google Gemini 2.5 Flash (gemini-2.5-flash)

## ✅ What's Done

- [x] AI-powered action item extraction
- [x] Full CRUD operations for action items
- [x] Status tracking (open/done)
- [x] Filter by status
- [x] Meeting history (last 5)
- [x] System health monitoring
- [x] Error handling
- [x] Responsive design
- [x] Clean, modern UI
- [x] Empty state handling
- [x] Date conversion (relative to absolute dates)
- [x] Input validation
- [x] Loading states

## 🚧 What's Not Done (Future Enhancements)

- [ ] User authentication
- [ ] Tags/categories for action items
- [ ] Email notifications for due dates
- [ ] Export to PDF/CSV
- [ ] Search functionality across all meetings
- [ ] Recurring meetings support
- [ ] Team collaboration features
- [ ] Calendar integration (Google Calendar, Outlook)
- [ ] Mobile native app
- [ ] Bulk operations (mark multiple as done)
- [ ] Reminders for upcoming deadlines
- [ ] Meeting templates
- [ ] Analytics dashboard

## 🐛 Known Issues

- None currently

## 📝 API Endpoints

### Health & Status
- `GET /api/health` - Check system health

### Transcripts
- `GET /api/transcripts` - Get last 5 transcripts
- `GET /api/transcripts/:id` - Get transcript with action items
- `POST /api/transcripts` - Create transcript and extract items
- `DELETE /api/transcripts/:id` - Delete transcript

### Action Items
- `POST /api/action-items` - Create action item manually
- `PUT /api/action-items/:id` - Update action item
- `DELETE /api/action-items/:id` - Delete action item

## 🤝 Contributing

This is a portfolio project for the Aggroso Full Stack Developer position.

## 📄 License

MIT

## 👤 Author

See `ABOUTME.md` for author information and resume.
