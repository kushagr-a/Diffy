# Deployment Guide

This guide covers deploying the GitHub PR Reviewer application to production.

## Prerequisites

- Node.js 18+
- MongoDB Atlas account (or any MongoDB hosting)
- GitHub OAuth App credentials
- Gemini API key (for AI reviews)

---

## Environment Variables

### Backend (.env)

Create a `.env` file in the `Backend/` folder:

```env
# Server
PORT=3030
NODE_ENV=production

# Database (MongoDB Atlas)
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/<dbname>

# JWT
JWT_SECRET=your-secure-jwt-secret-min-32-chars

# GitHub OAuth
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
GITHUB_CALLBACK_URL=https://your-backend-url.onrender.com/api/auth/github/callback

# GitHub Webhook
GITHUB_WEBHOOK_SECRET=your-webhook-secret

# AI (Gemini)
GEMINI_API_KEY=your-gemini-api-key

# Frontend URL (for CORS)
FRONTEND_URL=https://your-frontend-url.vercel.app
```

### Frontend (.env)

Create a `.env` file in the `Frontend/` folder:

```env
# Backend API URL (required for production)
VITE_API_URL=https://your-backend-url.onrender.com
```

---

## Deployment Options

### Option 1: Render.com (Recommended)

#### Backend Deployment
1. Push your code to GitHub
2. Go to [Render Dashboard](https://dashboard.render.com)
3. Create a new **Web Service**
4. Connect your GitHub repository
5. Configure:
   - **Root Directory**: `Backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
6. Add all environment variables in the Environment tab
7. Deploy

#### Frontend Deployment
1. Go to [Render Dashboard](https://dashboard.render.com)
2. Create a new **Static Site**
3. Connect your GitHub repository
4. Configure:
   - **Root Directory**: `Frontend`
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`
5. Add environment variable: `VITE_API_URL=https://your-backend.onrender.com`
6. Deploy

---

### Option 2: Vercel + Render

#### Frontend (Vercel)
1. Install Vercel CLI: `npm i -g vercel`
2. Or connect your GitHub repo to Vercel
3. Set environment variable: `VITE_API_URL=https://your-backend.onrender.com`
4. Deploy

#### Backend (Render)
Same as Option 1

---

### Option 3: Railway

1. Go to [Railway](https://railway.app)
2. Create a new project
3. Add MongoDB plugin
4. Deploy both Backend and Frontend as separate services
5. Configure environment variables

---

## GitHub OAuth Setup

1. Go to GitHub Settings > Developer Settings > OAuth Apps
2. Create new OAuth App:
   - **Homepage URL**: `https://your-frontend.vercel.app`
   - **Authorization callback URL**: `https://your-backend.onrender.com/api/auth/github/callback`
3. Copy Client ID and Client Secret to your environment variables

---

## GitHub Webhook Setup

1. Go to your repository > Settings > Webhooks
2. Add webhook:
   - **Payload URL**: `https://your-backend.onrender.com/api/webhooks/github`
   - **Content type**: `application/json`
   - **Events**: Select "Pull requests"
3. Add the webhook secret to your environment variables

---

## Post-Deployment Checklist

- [ ] Verify CORS settings allow your frontend domain
- [ ] Test GitHub OAuth login
- [ ] Test creating a PR and receiving AI review
- [ ] Verify database connection works
- [ ] Check webhook delivery logs

---

## Troubleshooting

### CORS Errors
Ensure `FRONTEND_URL` in backend `.env` matches your actual frontend URL exactly.

### MongoDB Connection
Make sure your MongoDB Atlas IP whitelist includes "Allow Access from Anywhere" (0.0.0.0/0) or your deployment provider's IP.

### GitHub Webhook Not Working
- Verify the webhook URL is publicly accessible (use ngrok to test locally)
- Check the webhook secret matches exactly

### Session/Cookie Issues
If using production, ensure cookies are set with `secure: true` (requires HTTPS).
