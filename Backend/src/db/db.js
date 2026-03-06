import mongoose from "mongoose";
import { configs } from "../utils/config/config.js"

const connectDB = async () => {
    try {
        mongoose.connection.on("connected", () => {
            console.log("Connected to database successfully")
        });

        mongoose.connection.on("error", (err) => {
            console.log("Error in connection to database.", err)
        })

        await mongoose.connect(configs.DB_URL);

    } catch (error) {
        console.error("Database Connection Failed: ", error.message)
        process.exit(1)
    }
};

export default connectDB;