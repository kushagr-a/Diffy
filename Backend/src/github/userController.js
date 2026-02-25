
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { User } from './userModel.js';

import { configs } from "../utils/config/config.js"


// const GITHUB_CALLBACK_URL = process.env.GITHUB_CALLBACK_URL || "http://localhost:3000/api/auth/github/callback";

const GITHUB_CALLBACK_URL = configs.GITHUB_CALLBACK_URL

// Must match exactly what's set in GitHub OAuth App settings
export const reditectUrl = async (req, res) => {
    const url = `https://github.com/login/oauth/authorize?client_id=${configs.GITHUB_CLIENT_ID}&redirect_uri=${encodeURIComponent(GITHUB_CALLBACK_URL)}&scope=repo`;
    res.redirect(url);
}

// The page after the authentication is approved or rejected
export const callBackUrl = async (req, res) => {
    try {
        const code = req.query.code;
        if (!code) {
            return res.status(400).json({ error: "Authorization code missing" });
        }
        console.log(">>> OAuth Callback triggered with code:", code ? "YES" : "NO");

        const tokenRes = await axios.post(
            "https://github.com/login/oauth/access_token",
            {
                client_id: configs.GITHUB_CLIENT_ID,
                client_secret: configs.GITHUB_CLIENT_SECRET,
                code,
                redirect_uri: GITHUB_CALLBACK_URL
            },
            {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                }
            }
        );

        if (tokenRes.data.error) {
            console.error(">>> GitHub token error:", tokenRes.data);
            return res.status(401).json({ error: tokenRes.data.error_description || tokenRes.data.error });
        }

        const accessToken = tokenRes.data.access_token;
        console.log(">>> Access Token received:", accessToken ? "YES" : "NO");

        const userRes = await axios.get("https://api.github.com/user", {
            headers: { authorization: `Bearer ${accessToken}` }
        });

        const githubUser = userRes.data;
        console.log(">>> GitHub User identified:", githubUser.login);

        let user = await User.findOne({ githubId: String(githubUser.id) });

        if (!user) {
            console.log(">>> Creating new user in DB...");
            user = await User.create({
                githubId: String(githubUser.id),
                username: githubUser.login,
                avatar: githubUser.avatar_url,
                email: githubUser.email,
                accessToken: accessToken
            });
            console.log(">>> User created successfully.");
        } else {
            console.log(">>> User exists, updating accessToken...");
            user.accessToken = accessToken;
            await user.save();
            console.log(">>> Token updated successfully.");
        }

        console.log(">>> Redirecting to frontend:", configs.FRONTEND_URL);
        const jwtToken = jwt.sign(
            { userId: user._id },
            configs.JWT_SECRET,
            { expiresIn: "1d" }
        );

        // set in cookie
        res.cookie("token", jwtToken, {
            httpOnly: true,
            secure: configs.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 24 * 60 * 60 * 1000
        });

        // Redirect to frontend dashboard
        res.redirect(configs.FRONTEND_URL);

    } catch (err) {
        console.error("GitHub OAuth error:", err.response?.data || err.message);
        res.status(err.response?.status || 500).json({
            error: err.response?.data?.error_description || err.message
        });
    }
}