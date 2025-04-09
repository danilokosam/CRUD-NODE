import app from "./app.js";
import dotenv from "dotenv";
import { connectToDatabase } from "./config/db.js";

// Load environment variables from .env.development
dotenv.config({ path: ".env.development" });

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  let server; // Variable to store the server instance

  try {
    // Connect to the database
    await connectToDatabase();
    console.log("Database connection established!");

    // Start the server
    server = app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT} 🚀`);
      console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
    });

    // Handle server errors
    server.on("error", (error) => {
      if (error.code === "EADDRINUSE") {
        console.error(
          `Port ${PORT} is already in use. Please use a different port.`
        );
      } else {
        console.error("Server error:", error);
      }
      process.exit(1); // Exit the process if there is an error
    });
  } catch (error) {
    console.error("Error starting the server:", error);
    process.exit(1); // Exit the process if there is an error connecting to the database
  }

  // Handle graceful server shutdown
  process.on("SIGINT", async () => {
    try {
      if (server) {
        server.close(() => {
          console.log("Server closed 👋");
        });
      }
      // The MongoDB connection is already closed in connectToDatabase
      process.exit(0);
    } catch (error) {
      console.error("Error during server shutdown:", error);
      process.exit(1);
    }
  });
};

// Start the server
startServer();