import app from "./app.js";
import { configs } from "./utils/config/config.js";
import connectDB from "./db/db.js"

const PORT = configs.PORT || 3030;

const staretServer = () => {
    try {
        const server = app.listen(PORT, () => {
            console.log(`Your server is running on http://localhost:${PORT}`);

            // connect to the database here
            connectDB()

            // Graceful shutdown
            const shutdown = async () => {
                console.log("Shutting down...");
                await db.$disconnect();
                server.close(() => {
                    console.log("Server closed.");
                    process.exit(0);
                });
            };

            process.on("SIGINT", shutdown);  // Ctrl + C
            process.on("SIGTERM", shutdown); // kill / Docker etc.
        })
    } catch (error) {
        console.error("Server startup failed:", error);
        process.exit(1);
    }
}

staretServer();