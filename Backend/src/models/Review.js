import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
    {
        repoFullName: {
            type: String,
            required: true,
            index: true
        },
        prNumber: Number,
        title: String,
        status: {
            type: String,
            enum: ['Passed', 'Warning', 'Critical'],
            default: 'Passed'
        },
        score: Number,
        analysis: String,
        suggestions: [String],
        timestamp: {
            type: Date,
            default: Date.now
        }
    },
    { timestamps: true }
);

export const Review = mongoose.model("Review", reviewSchema);
