<div align="center">
  <br />
  <img src="https://raw.githubusercontent.com/kushagr-a/GitHub_Pr_Reviewer/main/Frontend/public/favicon.ico" alt="Diffy Logo" width="80" height="auto" />
  <h1>DIFFY.</h1>
  <p>
    <strong>Stop shipping bugs, start shipping logic.</strong><br/>
    <em>Your AI Senior Engineer for every Pull Request.</em>
  </p>
  <br />

  <p>
    <a href="#features">Features</a> •
    <a href="#tech-stack">Tech Stack</a> •
    <a href="#local-development">Local Development</a> •
    <a href="#environment-variables">Environment Variables</a> •
    <a href="#connecting-github">Connecting GitHub</a>
  </p>
</div>

<hr />

## 🌟 Overview

Diffy is an **infrastructure-grade intelligence platform** designed to automate the most critical part of your engineering workflow: code review. 

Moving beyond basic syntax checking, Diffy integrates directly with your GitHub repositories to perform deep structural logic analysis, security verification, and real-time inspections using Advanced AI. It acts as a tireless Senior Engineer, providing comprehensive PR analysis and architectural feedback within seconds of pushing your commits.

## ✨ Features

- **Deep Logic Analysis**: Understands structural intent and detects complex architectural regressions automatically.
- **Security Verification**: Instant identification of credential leakage, insecure patterns, and critical logic flaws before they hit production.
- **Real-time Inspection**: Connect Repos as "Active Nodes" to receive comprehensive logic reports and scorecards directly on GitHub within seconds of your push.
- **Dynamic Dashboard**: A premium, deterministic interface to monitor active nodes, PR tracking, and logic scan queues across your entire synchronized network.
- **Seamless GitHub Integration**: One-click OAuth synchronization and automated webhook management.

---

## 🛠 Tech Stack

### Frontend
- **React.js** (Vite)
- **Tailwind CSS** (Premium Zinc/Monochrome Aesthetic)
- **Framer Motion** (Micro-animations and fluid transitions)
- **Lucide React** (Consistent iconography)
- **React Router** (Client-side routing)

### Backend
- **Node.js** & **Express**
- **MongoDB** with Mongoose (Data persistence for reviews and user nodes)
- **GitHub REST API / Webhooks** (PR data, user integration, real-time event listening)
- **Google Gemini API** (Core AI engine for deep logical reviews)
- **JWT** (Secure, cookie-based authentication)

---

## 🚀 Local Development

Follow these steps to set up Diffy locally on your machine.

### Prerequisites
- Node.js (v18 or higher recommended)
- MongoDB instance (Local or MongoDB Atlas)
- Minimal GitHub Account (For creating an OAuth app)
- Google Gemini API Key
- ngrok (To test GitHub Webhooks locally)

### 1. Clone the repository
```bash
git clone https://github.com/kushagr-a/GitHub_Pr_Reviewer.git
cd GitHub_Pr_Reviewer
```

### 2. Setup the Backend
Open a terminal in the root directory and navigate to the `Backend` folder:
```bash
cd Backend
npm install
```

### 3. Setup the Frontend
Open a new terminal in the root directory and navigate to the `Frontend` folder:
```bash
cd Frontend
npm install
```

---

## 🔑 Environment Variables

To run Diffy, you need to configure your environment variables. 

Create a `.env` file in the **`Backend`** directory and add the following:

```env
# Server Configuration
PORT=3030
NODE_ENV=development
FRONTEND_URL=http://localhost:5173

# Database
MONGO_URI=your_mongodb_connection_string

# Authentication (JWT)
JWT_SECRET=your_super_secret_jwt_key

# GitHub OAuth Credentials
GITHUB_CLIENT_ID=your_github_oauth_client_id
GITHUB_CLIENT_SECRET=your_github_oauth_client_secret
GITHUB_CALLBACK_URL=http://localhost:3030/api/auth/github/callback

# GitHub App/Webhook Variables
GITHUB_WEBHOOK_SECRET=your_custom_webhook_secret_string

# AI Configuration (Gemini)
GEMINI_API_KEY=your_google_gemini_api_key
```

---

## 🔌 Connecting GitHub (OAuth & Webhooks)

Because Diffy relies deeply on GitHub, you need to create a **GitHub OAuth Application**.

1. Go to your GitHub Profile -> **Settings** -> **Developer Settings** -> **OAuth Apps** -> **New OAuth App**.
2. **Application Name**: Diffy (Local)
3. **Homepage URL**: `http://localhost:5173`
4. **Authorization callback URL**: `http://localhost:3030/api/auth/github/callback`
5. Click **Register Application**.
6. Generate a **Client Secret**.
7. Copy the `Client ID` and `Client Secret` into your Backend `.env` file.

### Local Webhook Testing
To allow GitHub to send webhook events to your local machine, use `ngrok`:
```bash
ngrok http 3030
```
*(Update your GitHub webhook payload URLs with the generated ngrok forwarding address).*

---

## 🏃‍♂️ Running the Application

### Start the Backend Server
From the `Backend` directory:
```bash
npm run dev
```
*The server will start on `http://localhost:3030`.*

### Start the Frontend Client
From the `Frontend` directory:
```bash
npm run dev
```
*The client will start on `http://localhost:5173`. Open this URL in your browser to see Diffy in action!*

---

## 🤝 Contributing

Contributions make the open-source community an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<div align="center">
  <p>Built with precision for engineers by an engineer.</p>
</div>
