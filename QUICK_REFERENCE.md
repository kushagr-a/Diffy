# Quick Deployment Reference

## 1️⃣ Backend Deployment URL Pattern
```
https://[your-service-name].onrender.com
```

---

## 2️⃣ Frontend Deployment URL Pattern
```
https://[your-project-name].vercel.app
```

---

## 3️⃣ Critical URLs to Update

### In Render Dashboard (Backend Environment Variables)
```
CORS_ORIGIN = https://[your-project-name].vercel.app
FRONTEND_URL = https://[your-project-name].vercel.app
GITHUB_CALLBACK_URL = https://[your-service-name].onrender.com/api/auth/github/callback
```

### In Vercel Dashboard (Frontend Environment Variables)
```
VITE_API_URL = https://[your-service-name].onrender.com
```

### In GitHub OAuth App Settings
```
Authorization callback URL = https://[your-service-name].onrender.com/api/auth/github/callback
```

---

## 4️⃣ File Locations

| File | Location | Action |
|------|----------|--------|
| Backend dependencies | `Backend/package.json` | Already ready ✅ |
| Frontend dependencies | `Frontend/package.json` | Already ready ✅ |
| Backend start script | `Backend/src/server.js` | Uses PORT env var ✅ |
| Frontend config | `Frontend/src/utils/config.js` | Uses VITE_API_URL env var ✅ |

---

## 5️⃣ Required Environment Variables by Service

### BACKEND (Render) - Must Set All
```
PORT=3030
NODE_ENV=production
MONGO_URI=〆yours〆
JWT_SECRET=〆yours〆
GITHUB_CLIENT_ID=〆yours〆
GITHUB_CLIENT_SECRET=〆yours〆
GITHUB_CALLBACK_URL=〆yours〆
GITHUB_WEBHOOK_SECRET=〆yours〆
GEMINI_API_KEY=〆yours〆
IMAGE_KIT_PRIVATE=〆yours〆
CORS_ORIGIN=〆your-frontend-url〆
FRONTEND_URL=〆your-frontend-url〆
```

### FRONTEND (Vercel) - Must Set
```
VITE_API_URL=〆your-backend-url〆
```

---

## 6️⃣ Deployment Order (IMPORTANT!)

1. **Deploy Backend FIRST** 
   - Get your backend URL from Render
2. **Deploy Frontend SECOND**
   - Use backend URL as VITE_API_URL in Vercel
3. **Update Backend** 
   - Add frontend URL to CORS_ORIGIN in Render
4. **Update GitHub** 
   - Set callback URL in GitHub OAuth app

---

## 7️⃣ Verification Steps

### Test Backend (visit in browser)
```
https://[your-service-name].onrender.com/
```
Should show:
```json
{"status":"true","message":"Server is up and running!"}
```

### Test Frontend (visit in browser)
```
https://[your-project-name].vercel.app
```
Should show landing page with no console errors

### Test Connectivity
- Login with GitHub from frontend
- Should redirect to GitHub
- Should come back and show dashboard

---

## 8️⃣ Common Issues & Fixes

| Issue | Fix |
|-------|-----|
| Frontend shows blank page | Check `VITE_API_URL` is set correctly in Vercel |
| Login fails | Check GitHub callback URL matches in both GitHub settings + Backend GITHUB_CALLBACK_URL |
| CORS errors in console | Update `CORS_ORIGIN` in Backend and redeploy |
| Backend returns 502/503 | Check logs in Render dashboard, may be startup issue |
| API calls fail | Verify backend URL is accessible, check CORS settings |

---

## 9️⃣ Documentation Files Created

- `DEPLOY_GUIDE.md` - Detailed step-by-step guide
- `DEPLOYMENT_CHECKLIST.md` - Complete checklist to follow
- `ENV_VARIABLES.md` - Environment variable reference
- `QUICK_REFERENCE.md` - This file

👉 **Start with**: `DEPLOYMENT_CHECKLIST.md`
