import axios from 'axios';
import jwt from 'jsonwebtoken';
import { User } from './userModel.js';
import { configs } from "../utils/config/config.js"

const GITHUB_CALLBACK_URL = configs.GITHUB_CALLBACK_URL

// Redirect to GitHub for OAuth
export const reditectUrl = async (req, res) => {
    const url = `https://github.com/login/oauth/authorize?client_id=${configs.GITHUB_CLIENT_ID}&redirect_uri=${encodeURIComponent(GITHUB_CALLBACK_URL)}&scope=repo`;
    res.redirect(url);
}

// Handle GitHub Callback
export const callBackUrl = async (req, res) => {
    try {
        const code = req.query.code;
        if (!code) {
            return res.status(400).json({ error: "Authorization code missing" });
        }

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
            return res.status(401).json({ error: tokenRes.data.error_description || tokenRes.data.error });
        }

        const accessToken = tokenRes.data.access_token;

        const userRes = await axios.get("https://api.github.com/user", {
            headers: { authorization: `Bearer ${accessToken}` }
        });

        const githubUser = userRes.data;

        let user = await User.findOne({ githubId: String(githubUser.id) });

        if (!user) {
            user = await User.create({
                githubId: String(githubUser.id),
                username: githubUser.login,
                avatar: githubUser.avatar_url,
                email: githubUser.email,
                accessToken: accessToken
            });
        } else {
            user.accessToken = accessToken;
            await user.save();
        }

        const jwtToken = jwt.sign(
            { userId: user._id },
            configs.JWT_SECRET,
            { expiresIn: "1d" }
        );

        const isProduction = configs.NODE_ENV === "production";
        console.log(`>>> NODE_ENV: ${configs.NODE_ENV}, isProduction: ${isProduction}`);
        console.log(`>>> Setting cookie with sameSite: ${isProduction ? "none" : "lax"}, secure: ${isProduction}`);
        
        res.cookie("token", jwtToken, {
            httpOnly: true,
            secure: isProduction,
            // Required for cross-site frontend (Vercel) -> backend (Render) cookie auth
            sameSite: isProduction ? "none" : "lax",
            maxAge: 24 * 60 * 60 * 1000,
            path: "/"
        });

        res.redirect(`${configs.FRONTEND_URL}/dashboard`);
    } catch (err) {
        console.error("GitHub OAuth error:", err.message);
        res.status(500).json({ error: "Authentication failed" });
    }
}

// Logout UI Action
export const logout = (req, res) => {
    const isProduction = configs.NODE_ENV === "production";
    res.clearCookie("token", {
        path: "/",
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax"
    });
    res.redirect(configs.FRONTEND_URL || "http://localhost:5173");
};
