# Diffy

Diffy is an AI-powered GitHub PR reviewer. It connects to a user's GitHub account, tracks selected repositories, and generates review insights for pull requests.

## What Diffy Does (In Detail)

1. Authenticates users with GitHub OAuth.
2. Fetches repositories available to that user via GitHub API.
3. Lets users choose which repositories to enable in the dashboard.
4. Creates/removes webhooks when a repo is connected/disconnected.
5. Listens to PR webhook events (`opened`, `synchronize`, `reopened`).
6. Fetches PR context and sends it to Gemini for analysis.
7. Stores generated review data and metadata in MongoDB.
8. Shows active repos, scans, and report summaries in the dashboard.

## What Diffy Does NOT Do

1. It does not replace GitHub's native code review process or branch protections.
2. It does not auto-merge PRs or auto-approve code.
3. It does not guarantee bug-free code; results are AI-generated guidance.
4. It does not scan repositories unless a user explicitly connects them.
5. It does not run a full CI/CD pipeline (tests/build/deploy) by itself.

## How It Works (Simple Flow)

1. User clicks **Connect GitHub**.
2. Backend completes OAuth and redirects user to dashboard.
3. User connects one or more repositories.
4. Diffy receives PR webhook events from connected repos.
5. Backend analyzes PR content with Gemini and stores output.
6. User sees analysis from dashboard and GitHub comments/reports.

## Tech Stack

- Frontend: React + Vite
- Backend: Node.js + Express
- Database: MongoDB
- AI: Gemini API

## Project Structure

- `Frontend/` - React app
- `Backend/` - Express API

## Local Setup

### 1. Clone and install

```bash
git clone https://github.com/kushagr-a/GitHub_Pr_Reviewer.git
cd GitHub_Pr_Reviewer

cd Backend
npm install

cd ../Frontend
npm install
```

### 2. Backend env (`Backend/.env`)

```env
PORT=3030
NODE_ENV=development

MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret

GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
GITHUB_CALLBACK_URL=http://localhost:3030/api/auth/github/callback
GITHUB_WEBHOOK_SECRET=your_webhook_secret

GEMINI_API_KEY=your_gemini_api_key

FRONTEND_URL=http://localhost:5173
CORS_ORIGIN=http://localhost:5173
```

### 3. Frontend env (`Frontend/.env`)

```env
VITE_API_URL=http://localhost:3030
```

### 4. Run app

```bash
# terminal 1
cd Backend
npm run dev

# terminal 2
cd Frontend
npm run dev
```

Open: `http://localhost:5173`

## GitHub OAuth Setup

Create an OAuth app in GitHub:

- Homepage URL: `http://localhost:5173`
- Callback URL: `http://localhost:3030/api/auth/github/callback`

Copy Client ID and Client Secret to `Backend/.env`.

## Production (Render + Vercel)

### Backend (Render)

Set these environment variables in Render:

```env
NODE_ENV=production
MONGO_URI=...
JWT_SECRET=...
GITHUB_CLIENT_ID=...
GITHUB_CLIENT_SECRET=...
GITHUB_CALLBACK_URL=https://your-backend.onrender.com/api/auth/github/callback
GITHUB_WEBHOOK_SECRET=...
GEMINI_API_KEY=...
FRONTEND_URL=https://your-frontend.vercel.app
CORS_ORIGIN=https://your-frontend.vercel.app
```

Do not force `PORT` on Render.

### Frontend (Vercel)

Set this variable in Vercel:

```env
VITE_API_URL=https://your-backend.onrender.com
```

## Notes

- After login, users are redirected to dashboard.
- Repository webhooks are managed from the dashboard connect/disconnect flow.
- If dashboard shows 400, check `VITE_API_URL`, `CORS_ORIGIN`, and OAuth callback URL.
