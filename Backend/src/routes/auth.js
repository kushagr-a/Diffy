// import express from 'express';
// import axios from 'axios';
// import jwt from 'jsonwebtoken';
// import User from '../models/User.js';

// const router = express.Router();

// // Must match exactly what's set in GitHub OAuth App settings
// const GITHUB_CALLBACK_URL = process.env.GITHUB_CALLBACK_URL || "http://localhost:3000/api/auth/github/callback";

// router.get("/github", (req, res) => {
//     const url = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=${encodeURIComponent(GITHUB_CALLBACK_URL)}`;
//     res.redirect(url);
// });

// // The page after the authentication is approved or rejected
// router.get("/github/callback", async (req, res) => {
//     try {
//         const code = req.query.code;
//         if (!code) {
//             return res.status(400).json({ error: "Authorization code missing" });
//         }

//         const tokenRes = await axios.post(
//             "https://github.com/login/oauth/access_token",
//             {
//                 client_id: process.env.GITHUB_CLIENT_ID,
//                 client_secret: process.env.GITHUB_CLIENT_SECRET,
//                 code,
//                 redirect_uri: GITHUB_CALLBACK_URL
//             },
//             {
//                 headers: {
//                     Accept: "application/json",
//                     "Content-Type": "application/json"
//                 }
//             }
//         );

//         if (tokenRes.data.error) {
//             console.error("GitHub token error:", tokenRes.data);
//             return res.status(401).json({ error: tokenRes.data.error_description || tokenRes.data.error });
//         }

//         const accessToken = tokenRes.data.access_token;

//         const userRes = await axios.get("https://api.github.com/user", {
//             headers: { authorization: `Bearer ${accessToken}` }
//         });

//         const githubUser = userRes.data;

//         let user = await User.findOne({ githubId: githubUser.id });

//         if (!user) {
//             user = await User.create({
//                 githubId: githubUser.id,
//                 username: githubUser.login,
//                 avatar: githubUser.avatar_url,
//                 email: githubUser.email
//             });
//         }

//         const jwtToken = jwt.sign(
//             { userId: user._id },
//             process.env.JWT_SECRET,
//             { expiresIn: "1d" }
//         );

//         res.json({
//             message: "Login Succesful",
//             token: jwtToken,
//             user
//         });
//     } catch (err) {
//         console.error("GitHub OAuth error:", err.response?.data || err.message);
//         res.status(err.response?.status || 500).json({
//             error: err.response?.data?.error_description || err.message
//         });
//     }
// });

// export default router;