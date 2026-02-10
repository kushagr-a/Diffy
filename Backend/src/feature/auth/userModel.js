import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    githubId: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        default: null
    },
    avatar: {
        type: String
    },
    provider: {
        type: String,
        default: "github"
    },
    lastLogin: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
}
)

export const User = mongoose.model("User", userSchema)