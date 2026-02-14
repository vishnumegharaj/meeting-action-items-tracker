# Deployment Guide

This guide covers multiple deployment options for the Meeting Action Items Tracker.

## Table of Contents
1. [Quick Deploy with Docker](#quick-deploy-with-docker)
2. [Deploy Backend (Render)](#deploy-backend-render)
3. [Deploy Frontend (Vercel)](#deploy-frontend-vercel)
4. [Deploy Backend (Railway)](#deploy-backend-railway)
5. [Deploy Frontend (Netlify)](#deploy-frontend-netlify)

---

## Quick Deploy with Docker

### Prerequisites
- Docker and Docker Compose installed
- Anthropic API key

### Steps

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd meeting-tracker
```

2. **Set environment variables**
```bash
# Create .env file in root directory
echo "ANTHROPIC_API_KEY=your_key_here" > .env
```

3. **Run with Docker Compose**
```bash
docker-compose up -d
```

4. **Access the application**
- Frontend: http://localhost:5173
- Backend: http://localhost:3001
- Health check: http://localhost:3001/api/health

5. **Stop the application**
```bash
docker-compose down
```

---

## Deploy Backend (Render)

### Step 1: Create Render Account
1. Go to [render.com](https://render.com)
2. Sign up or log in

### Step 2: Create New Web Service
1. Click "New +" → "Web Service"
2. Connect your GitHub repository
3. Select your repository

### Step 3: Configure Service
```
Name: meeting-tracker-backend
Environment: Node
Region: Choose closest to you
Branch: main
Root Directory: backend
Build Command: npm install
Start Command: npm start
```

### Step 4: Add Environment Variables
```
ANTHROPIC_API_KEY = your_anthropic_api_key
FRONTEND_URL = https://your-frontend-url.vercel.app
PORT = 3001
```

### Step 5: Deploy
1. Click "Create Web Service"
2. Wait for deployment to complete
3. Copy your backend URL (e.g., `https://meeting-tracker-backend.onrender.com`)

### Step 6: Test
Visit: `https://your-backend-url.onrender.com/api/health`

---

## Deploy Frontend (Vercel)

### Step 1: Create Vercel Account
1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub

### Step 2: Import Project
1. Click "Add New..." → "Project"
2. Import your GitHub repository
3. Select the repository

### Step 3: Configure Project
```
Framework Preset: Vite
Root Directory: frontend
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

### Step 4: Add Environment Variable
```
VITE_API_URL = https://your-backend-url.onrender.com/api
```

### Step 5: Deploy
1. Click "Deploy"
2. Wait for deployment
3. Copy your frontend URL (e.g., `https://meeting-tracker.vercel.app`)

### Step 6: Update Backend
Go back to Render and update the `FRONTEND_URL` environment variable with your Vercel URL.

---

## Deploy Backend (Railway)

### Step 1: Create Railway Account
1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub

### Step 2: Create New Project
1. Click "New Project"
2. Select "Deploy from GitHub repo"
3. Choose your repository

### Step 3: Configure Service
1. Select the `backend` directory
2. Railway will auto-detect Node.js

### Step 4: Add Environment Variables
```
ANTHROPIC_API_KEY = your_anthropic_api_key
FRONTEND_URL = https://your-frontend-url.vercel.app
PORT = 3001
```

### Step 5: Configure Start Command
1. Go to Settings → Deploy
2. Set Start Command: `npm start`
3. Set Root Directory: `backend`

### Step 6: Deploy
1. Railway will automatically deploy
2. Go to Settings → Networking
3. Generate a public domain
4. Copy the URL

---

## Deploy Frontend (Netlify)

### Step 1: Create Netlify Account
1. Go to [netlify.com](https://netlify.com)
2. Sign up with GitHub

### Step 2: Add New Site
1. Click "Add new site" → "Import an existing project"
2. Choose GitHub
3. Select your repository

### Step 3: Configure Build Settings
```
Base directory: frontend
Build command: npm run build
Publish directory: frontend/dist
```

### Step 4: Add Environment Variable
1. Go to Site settings → Environment variables
2. Add:
```
VITE_API_URL = https://your-backend-url.onrender.com/api
```

### Step 5: Deploy
1. Click "Deploy site"
2. Wait for deployment
3. Copy your site URL

---

## Post-Deployment Checklist

After deploying, verify:

- [ ] Backend health check works: `https://your-backend/api/health`
- [ ] Frontend loads without errors
- [ ] Can create a new meeting transcript
- [ ] AI extraction works (action items are extracted)
- [ ] Can edit action items
- [ ] Can delete action items
- [ ] Can mark items as done
- [ ] Status page shows all services healthy
- [ ] CORS is configured correctly (no console errors)

---

## Common Issues & Solutions

### CORS Errors
**Problem**: Frontend can't connect to backend

**Solution**: 
- Make sure `FRONTEND_URL` in backend matches your frontend URL exactly
- Include protocol (https://) and no trailing slash

### AI Extraction Not Working
**Problem**: Action items not being extracted

**Solution**:
- Verify `ANTHROPIC_API_KEY` is set correctly
- Check backend logs for API errors
- Ensure you have API credits in Anthropic account

### Database Issues
**Problem**: "Database locked" or connection errors

**Solution**:
- SQLite should work out of the box
- For Render/Railway, database persists in the container
- Consider upgrading to PostgreSQL for production

### Build Failures

**Frontend Build Fails**:
```bash
# Make sure all dependencies are in package.json
cd frontend
npm install
npm run build
```

**Backend Build Fails**:
```bash
# Make sure all dependencies are in package.json
cd backend
npm install
npm start
```

---

## Environment Variables Summary

### Backend Required
```env
ANTHROPIC_API_KEY=sk-ant-xxx...     # Required
FRONTEND_URL=https://...             # Required for CORS
PORT=3001                            # Optional (default: 3001)
```

### Frontend Required
```env
VITE_API_URL=https://.../api        # Required
```

---

## Monitoring & Maintenance

### Check Logs

**Render**:
1. Go to your service
2. Click "Logs" tab

**Railway**:
1. Go to your service
2. Click "Deployments"
3. Click on latest deployment
4. View logs

**Vercel/Netlify**:
1. Go to your site
2. Click on deployment
3. View function logs

### Update Deployment

**Backend/Frontend**:
1. Push changes to GitHub
2. Render/Vercel will auto-deploy
3. Or trigger manual deploy from dashboard

---

## Scaling Considerations

For production use, consider:

1. **Database**: Migrate from SQLite to PostgreSQL
2. **Authentication**: Add user authentication
3. **Rate Limiting**: Implement API rate limits
4. **Caching**: Add Redis for caching
5. **Monitoring**: Set up error tracking (Sentry)
6. **Backups**: Regular database backups
7. **CDN**: Use CDN for static assets

---

## Cost Estimates

**Free Tier Available**:
- Vercel: 100GB bandwidth/month
- Netlify: 100GB bandwidth/month
- Render: 750 hours/month (free tier)
- Railway: $5 credit/month

**Anthropic API**:
- Pay per token usage
- Estimate: ~$0.001-0.01 per meeting transcript
- Monitor usage in Anthropic console

---

## Support

If you encounter issues:
1. Check the Common Issues section above
2. Review logs in your hosting platform
3. Test locally first with `npm start`
4. Verify all environment variables are set correctly
