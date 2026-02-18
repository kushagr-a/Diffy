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

        // 1) Get token from authorization header or cookies
        const token = req.cookies?.token || req.headers.authorization?.split(" ")[1]

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