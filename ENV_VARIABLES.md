# Environment Variables for Production Deployment

## BACKEND ENVIRONMENT VARIABLES (.env file in Backend/)

```env
# Server Configuration
PORT=3030
NODE_ENV=production

# Database
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname

# JWT Authentication
JWT_SECRET=your-secure-jwt-secret-minimum-32-characters

# GitHub OAuth
GITHUB_CLIENT_ID=your-github-oauth-app-client-id
GITHUB_CLIENT_SECRET=your-github-oauth-app-client-secret
GITHUB_CALLBACK_URL=https://your-backend-name.onrender.com/api/auth/github/callback
GITHUB_WEBHOOK_SECRET=your-github-webhook-secret

# AI API (Gemini)
GEMINI_API_KEY=your-google-gemini-api-key

# Image Handler
IMAGE_KIT_PRIVATE=your-imagekit-private-key

# CORS Configuration (comma-separated for multiple origins)
CORS_ORIGIN=https://your-frontend.vercel.app

# Frontend URL
FRONTEND_URL=https://your-frontend.vercel.app
```

## FRONTEND ENVIRONMENT VARIABLES (.env file in Frontend/)

```env
VITE_API_URL=https://your-backend-name.onrender.com
```

---

## How to Get These Values

### MongoDB URI
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create/Select a cluster
3. Click "Connect" → "Connect your application"
4. Copy the connection string
5. Replace `<password>` and `<cluster-name>` with your actual values

### GitHub OAuth Credentials
1. Go to GitHub Settings → [Developer settings → OAuth Apps](https://github.com/settings/developers)
2. Create new OAuth App
3. Set Authorization callback URL to: `https://your-backend-name.onrender.com/api/auth/github/callback`
4. Copy Client ID and Client Secret

### Gemini API Key
1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Create new API key
3. Copy and save securely

### ImageKit Private Key
1. Go to [ImageKit Dashboard](https://imagekit.io/dashboard)
2. Navigate to Developer Settings
3. Copy Private Key

---

## Required Ports

- **Backend**: 3030 (set in .env PORT variable)
- **Frontend**: Vercel automatically handles this

## IMPORTANT Notes

1. **Never commit .env files to GitHub** - They contain secrets!
2. Set all environment variables directly in Render and Vercel dashboards
3. After deploying frontend, update `CORS_ORIGIN` in backend with your Vercel URL
4. Test GitHub OAuth after deployment with correct callback URL
