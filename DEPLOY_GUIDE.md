# Deployment Guide: Render (Backend) + Vercel (Frontend)

## Prerequisites

- GitHub account with your repo already pushed
- MongoDB Atlas account (free tier available)
- GitHub OAuth App created (for authentication)
- Google Gemini API key
- ImageKit account (for image handling)

---

## Step 1: Prepare Your Environment Files

### Backend (.env file location: `Backend/.env`)
Create this file in your Backend folder with all required variables:

```env
PORT=3030
NODE_ENV=production

MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname

JWT_SECRET=your-jwt-secret-min-32-chars-random-string

GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
GITHUB_CALLBACK_URL=https://your-backend-name.onrender.com/api/auth/github/callback
GITHUB_WEBHOOK_SECRET=your-webhook-secret

GEMINI_API_KEY=your-gemini-api-key

IMAGE_KIT_PRIVATE=your-imagekit-private-key

FRONTEND_URL=https://your-frontend.vercel.app
```

### Frontend (.env file location: `Frontend/.env`)
```env
VITE_API_URL=https://your-backend-name.onrender.com
```

---

## Step 2: Deploy Backend to Render

### 2.1 Create a Render Account
1. Go to [Render Dashboard](https://dashboard.render.com)
2. Sign up with GitHub (easier for linking repos)

### 2.2 Create Web Service
1. Dashboard → Click **"New +"** → Select **"Web Service"**
2. Connect your GitHub repository
3. Select your repo and branch

### 2.3 Configure Render Service
Fill in these settings:

| Setting | Value |
|---------|-------|
| **Name** | `github-pr-reviewer-backend` |
| **Root Directory** | `Backend` |
| **Runtime** | `Node` |
| **Build Command** | `npm install` |
| **Start Command** | `npm start` |
| **Instance Type** | Free (or Starter for better performance) |

### 2.4 Add Environment Variables
1. Scroll down to **Environment** section
2. Click **"Add Environment Variable"** for each:
   - `PORT`: `3030`
   - `NODE_ENV`: `production`
   - `MONGO_URI`: Your MongoDB connection string
   - `JWT_SECRET`: Your JWT secret
   - `GITHUB_CLIENT_ID`: From GitHub OAuth app
   - `GITHUB_CLIENT_SECRET`: From GitHub OAuth app
   - `GITHUB_CALLBACK_URL`: Will look like `https://github-pr-reviewer-backend.onrender.com/api/auth/github/callback`
   - `GITHUB_WEBHOOK_SECRET`: Your webhook secret
   - `GEMINI_API_KEY`: Your Gemini API key
   - `IMAGE_KIT_PRIVATE`: Your ImageKit private key
   - `FRONTEND_URL`: Your Vercel frontend URL (add later after frontend deploy)

### 2.5 Deploy
1. Click **"Create Web Service"**
2. Render will automatically build and deploy
3. Wait for the build to complete (3-5 minutes)
4. Copy the service URL (e.g., `https://github-pr-reviewer-backend.onrender.com`)

**⚠️ Important**: Save your backend URL - you'll need it for frontend deployment!

---

## Step 3: Deploy Frontend to Vercel

### 3.1 Create Vercel Account
1. Go to [Vercel](https://vercel.com)
2. Sign up with GitHub

### 3.2 Import Project
1. Click **"Add New..."** → **"Project"**
2. Select your GitHub repository
3. Import it

### 3.3 Configure Project
1. **Framework Preset**: Select `Vite`
2. **Root Directory**: Select `Frontend`
3. **Build Command**: `npm run build`
4. **Output Directory**: `dist`

### 3.4 Add Environment Variables
1. Scroll to **Environment Variables**
2. Add:
   - **Name**: `VITE_API_URL`
   - **Value**: `https://your-backend-name.onrender.com`
   - Click **"Add"**

### 3.5 Deploy
1. Click **"Deploy"**
2. Wait for deployment to complete
3. Copy your Vercel URL (e.g., `https://your-project.vercel.app`)

---

## Step 4: Update Backend Environment Variable

Now that you have your Vercel frontend URL:

1. Go back to [Render Dashboard](https://dashboard.render.com)
2. Select your backend service
3. Go to **Settings** → **Environment**
4. Find `FRONTEND_URL` and update with your Vercel URL
5. Click **"Save Changes"** - This will trigger a redeploy

---

## Step 5: Update GitHub OAuth Callback URL

Your GitHub OAuth app needs the correct callback URL:

1. Go to GitHub → Settings → Developer settings → OAuth Apps
2. Select your app
3. Update **Authorization callback URL** to:
   ```
   https://your-backend-name.onrender.com/api/auth/github/callback
   ```

---

## Troubleshooting

### Backend won't deploy
- Check that `Backend/package.json` has `"main": "src/server.js"`
- Verify all environment variables are set
- Check Render logs for errors

### Frontend shows blank page
- Check browser console for errors
- Verify `VITE_API_URL` is correct and accessible
- Test backend is running: Visit your backend URL in browser

### CORS errors
- Check backend has CORS configured for your Vercel URL
- In `Backend/src/app.js`, ensure:
  ```javascript
  app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
  }));
  ```

### GitHub OAuth not working
- Verify GitHub callback URL matches exactly
- Check `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET` are correct

### Cold starts on Render
- Free tier has cold starts (~20-30s). Upgrade to Starter for better performance
- Consider upgrading if development progresses

---

## Post-Deployment Checklist

- [ ] Backend deployed and running on Render
- [ ] Frontend deployed and running on Vercel
- [ ] Environment variables set on both platforms
- [ ] GitHub OAuth working
- [ ] Able to login via GitHub
- [ ] API calls from frontend to backend working
- [ ] Database connections working

---

## Useful Links

- **Render Dashboard**: https://dashboard.render.com
- **Vercel Dashboard**: https://vercel.com/dashboard
- **MongoDB Atlas**: https://www.mongodb.com/cloud/atlas
- **GitHub Settings**: https://github.com/settings/developers
