# Render + Vercel Deployment Checklist

## Pre-Deployment (Do These First)

### ✅ Setup Accounts & Services
- [ ] Create MongoDB Atlas account and cluster
- [ ] Create GitHub OAuth App
- [ ] Get Gemini API key
- [ ] Get ImageKit API keys
- [ ] Create Render account (sign up with GitHub)
- [ ] Create Vercel account (sign up with GitHub)

### ✅ Prepare Environment Variables
- [ ] Gather all values from above services
- [ ] Create `.env` file in `Backend/` folder with all variables
- [ ] Note: Don't commit `.env` to GitHub (it's in .gitignore, right?)

### ✅ Code Checks
- [ ] All dependencies installed (`npm install` in both Backend and Frontend)
- [ ] No obvious errors in terminal
- [ ] Make sure you've pushed latest code to GitHub

---

## Deployment Steps

### Step 1: Deploy Backend to Render

- [ ] Go to https://dashboard.render.com
- [ ] Click "New" → "Web Service"
- [ ] Connect your GitHub repository
- [ ] Configure:
  - Name: `github-pr-reviewer-backend`
  - Root Directory: `Backend`
  - Build Command: `npm install`
  - Start Command: `npm start`
- [ ] Add Environment Variables:
  - [ ] PORT = 3030
  - [ ] NODE_ENV = production
  - [ ] MONGO_URI = (your MongoDB connection string)
  - [ ] JWT_SECRET = (your secure secret)
  - [ ] GITHUB_CLIENT_ID = (from OAuth app)
  - [ ] GITHUB_CLIENT_SECRET = (from OAuth app)
  - [ ] GITHUB_CALLBACK_URL = https://your-service-name.onrender.com/api/auth/github/callback
  - [ ] GITHUB_WEBHOOK_SECRET = (your webhook secret)
  - [ ] GEMINI_API_KEY = (your Gemini key)
  - [ ] IMAGE_KIT_PRIVATE = (your ImageKit key)
  - [ ] CORS_ORIGIN = (add after frontend deployment)
  - [ ] FRONTEND_URL = (add after frontend deployment)
- [ ] Click "Create Web Service"
- [ ] **WAIT** for deployment to complete (3-5 mins)
- [ ] ✅ **SAVE YOUR BACKEND URL** (e.g., https://github-pr-reviewer-backend.onrender.com)

> **Backend URL will look like**: `https://github-pr-reviewer-backend.onrender.com`

---

### Step 2: Deploy Frontend to Vercel

- [ ] Go to https://vercel.com/dashboard
- [ ] Click "Add New" → "Project"
- [ ] Select your GitHub repository
- [ ] Configure Import Project:
  - [ ] Framework Preset: `Vite`
  - [ ] Root Directory: `Frontend`
  - [ ] Build Command: `npm run build` (should auto-detect)
  - [ ] Output Directory: `dist` (should auto-detect)
- [ ] Add Environment Variable:
  - [ ] Name: `VITE_API_URL`
  - [ ] Value: `https://YOUR-BACKEND-URL.onrender.com` (from Step 1)
- [ ] Click "Deploy"
- [ ] **WAIT** for deployment to complete (2-3 mins)
- [ ] ✅ **SAVE YOUR FRONTEND URL** (e.g., https://your-project.vercel.app)

> **Frontend URL will look like**: `https://your-project.vercel.app`

---

### Step 3: Update Backend with Frontend URL

- [ ] Go back to Render Dashboard
- [ ] Select your backend service
- [ ] Go to "Environment" in settings
- [ ] Update these variables:
  - [ ] `CORS_ORIGIN` = `https://YOUR-FRONTEND-URL.vercel.app` (from Step 2)
  - [ ] `FRONTEND_URL` = `https://YOUR-FRONTEND-URL.vercel.app` (from Step 2)
- [ ] Click "Save"
- [ ] Service will auto-redeploy - wait for completion

---

### Step 4: Update GitHub OAuth App

- [ ] Go to GitHub Settings → Developer settings → OAuth Apps
- [ ] Select your app
- [ ] Update **Authorization callback URL** to:
  ```
  https://YOUR-BACKEND-URL.onrender.com/api/auth/github/callback
  ```
- [ ] Click "Update application"

---

## Testing After Deployment

- [ ] Open your Vercel frontend URL in browser
- [ ] Should load without blank page
- [ ] Try logging in with GitHub
- [ ] Can you see your dashboard?
- [ ] Go to backend URL directly - should see `{"status":"true","message":"Server is up and running!"}`
- [ ] Test creating/viewing reviews

---

## If Something Goes Wrong

### Backend won't deploy
1. Check Render logs: Dashboard → Select service → Logs tab
2. Look for error messages
3. Verify all environment variables are set
4. Check that `Backend/package.json` exists with proper content

### Frontend blank page
1. Open browser console (F12)
2. Check for errors
3. Verify `VITE_API_URL` in Vercel environment variables is correct
4. Check that backend service URL is actually available

### Login doesn't work
1. Check Render service logs for GitHub OAuth errors
2. Verify GitHub OAuth app callback URL is correct
3. Check `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET` match

### CORS errors
1. Check browser console for error message
2. Make sure `CORS_ORIGIN` environment variable includes your frontend URL
3. Re-deploy backend service after updating CORS_ORIGIN

---

## Important Links

| Service | Link |
|---------|------|
| Render Dashboard | https://dashboard.render.com |
| Vercel Dashboard | https://vercel.com/dashboard |
| MongoDB Atlas | https://www.mongodb.com/cloud/atlas |
| GitHub OAuth Settings | https://github.com/settings/developers |
| Google AI Studio | https://aistudio.google.com/app/apikey |
| ImageKit Dashboard | https://imagekit.io/dashboard |

---

## Notes

- **Cold starts on free Render tier**: First request after inactivity may take 20-30 seconds
- **Webhook testing**: Use Render's environment rebuild feature after changing environment variables
- **SSL/HTTPS**: Both Render and Vercel provide free HTTPS by default
- **Database**: Free tier MongoDB Atlas is fine for testing (512MB limit)
