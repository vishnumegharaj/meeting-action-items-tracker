# 🚀 Quick Start Guide

Get the Meeting Action Items Tracker running in 5 minutes!

## Prerequisites

✅ Node.js 18+ installed  
✅ npm installed  
✅ Anthropic API key ([Get free key](https://console.anthropic.com/))

## Step 1: Get the API Key (2 minutes)

1. Go to https://console.anthropic.com/
2. Sign up or log in
3. Go to API Keys section
4. Click "Create Key"
5. Copy your API key (starts with `sk-ant-...`)

## Step 2: Setup Backend (1 minute)

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env and add your API key
# ANTHROPIC_API_KEY=sk-ant-your-key-here
```

**On Mac/Linux:**
```bash
echo "ANTHROPIC_API_KEY=sk-ant-your-key-here" > .env
echo "PORT=3001" >> .env
echo "FRONTEND_URL=http://localhost:5173" >> .env
```

**On Windows (PowerShell):**
```powershell
"ANTHROPIC_API_KEY=sk-ant-your-key-here" | Out-File -FilePath .env
"PORT=3001" | Out-File -FilePath .env -Append
"FRONTEND_URL=http://localhost:5173" | Out-File -FilePath .env -Append
```

## Step 3: Setup Frontend (1 minute)

```bash
# Navigate to frontend
cd ../frontend

# Install dependencies
npm install
```

## Step 4: Run the App (1 minute)

**Terminal 1 - Start Backend:**
```bash
cd backend
npm start
```

You should see:
```
Server running on port 3001
Health check: http://localhost:3001/api/health
```

**Terminal 2 - Start Frontend:**
```bash
cd frontend
npm run dev
```

You should see:
```
  ➜  Local:   http://localhost:5173/
```

## Step 5: Use the App! 🎉

1. **Open browser**: Go to http://localhost:5173
2. **Click "New Meeting"**
3. **Paste a transcript** (or click "Load Example")
4. **Click "Process Meeting Transcript"**
5. **Watch the magic happen!** ✨

## Example Transcript to Try

```
Team Meeting - January 15, 2026

John: Good morning everyone. Let's start with the project updates.

Sarah: I've completed the design mockups. John, can you review them by Friday?

John: Sure, I'll review the mockups by end of week. Also, Mike, can you set up the staging environment?

Mike: Yes, I'll have the staging environment ready by Wednesday. Sarah, once John approves the designs, can you send them to the client?

Sarah: Absolutely. I'll send the final designs to the client once approved. Also, we need to schedule a follow-up meeting for next Monday.

John: Good point. Sarah, please schedule that meeting for 2 PM next Monday.

Mike: I'll also prepare the technical documentation by Thursday.
```

## Troubleshooting

### Port already in use
```bash
# Backend (port 3001)
# Kill the process using port 3001
lsof -ti:3001 | xargs kill -9

# Frontend (port 5173)
# Kill the process using port 5173
lsof -ti:5173 | xargs kill -9
```

### API Key not working
- Make sure there are no spaces in the .env file
- Make sure the key starts with `sk-ant-`
- Check you have credits in your Anthropic account

### Dependencies not installing
```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### CORS errors in browser
- Make sure backend is running on port 3001
- Make sure frontend is running on port 5173
- Check that FRONTEND_URL in backend/.env is exactly `http://localhost:5173`

## What to Check

✅ Backend running on port 3001  
✅ Frontend running on port 5173  
✅ Health check working: http://localhost:3001/api/health  
✅ Can access frontend: http://localhost:5173  
✅ Status page shows all services healthy  

## Next Steps

- Read the full [README.md](README.md) for detailed documentation
- Explore the [Status Page](http://localhost:5173/status) to monitor system health
- Review the code to understand how it works

## Project Structure

```
meeting-tracker/
├── backend/           # Node.js + Express API
│   ├── server.js      # Main server file
│   ├── database.js    # SQLite database
│   └── llmService.js  # AI integration
├── frontend/          # React + Vite app
│   └── src/
│       ├── pages/     # Page components
│       ├── App.jsx    # Main app
│       └── api.js     # API client
└── README.md          # Full documentation
```

## Need Help?

1. Check the console for error messages
2. Review backend terminal for API errors
3. Check frontend browser console for frontend errors
4. Visit the Status page: http://localhost:5173/status
5. Review the full README.md

---

**Congratulations! 🎉 You're all set up!**

Now try creating your first meeting transcript and watch as AI automatically extracts action items for you.
