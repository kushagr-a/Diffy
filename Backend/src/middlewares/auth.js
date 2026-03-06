import jwt from "jsonwebtoken";

import { configs } from "../utils/config/config.js"
import { User } from "../github/userModel.js"

// module.exports = (req, res, next) => {
//     const token = req.headers.suthorization.split(" ")[1];

//     if (!token) return res.status(401).json({ msg: "No token" });

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.userId = decoded.userId;
//         next();
//     } catch {
//         res.status(401).json({ msg: "Invalid;" })
//     }
// };


export const authenticateUsers = async (req, res, next) => {
    try {

        // 1) Get token from cookies, Authorization header, or Bearer token
        let token = req.cookies?.token;
        
        if (!token && req.headers.authorization) {
            // Extract Bearer token from Authorization header
            const parts = req.headers.authorization.split(" ");
            if (parts[0] === "Bearer" && parts[1]) {
                token = parts[1];
            }
        }
        
        console.log(`>>> Auth check - Token from cookies:`, !!req.cookies?.token);
        console.log(`>>> Auth check - Token from Authorization header:`, !!(req.headers.authorization && !req.cookies?.token));
        console.log(`>>> Auth check - Final token found:`, !!token);

        // validation 
        if (!token) {
            return res.status(400).json({
                success: false,
                message: "You are not logged in. Please log in to get access"
            })
        }

        // 2) Verify token
        const decoded = jwt.verify(token, configs.JWT_SECRET)

        // 3) Check if user still exists
        const currentUser = await User.findById(decoded.userId)

        // validation
        if (!currentUser) {
            return res.status(404).json({
                success: false,
                message: "The user belonging to this token no longer exists",
            })
        }

        // GRANT ACCESS TO PROTECTED ROUTE
        req.user = currentUser
        next()

    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({
                success: false,
                message: "Invalid token",
            });
        }

        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({
                success: false,
                message: "Token Expire please login!"
            })
        }

        return res.status(500).json({
            success: false,
            message: "Authentication failed",
        });

    }
}