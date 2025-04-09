import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: ".env.development" }); // Load environment variables from .env.development

const uri = process.env.ATLAS_URI_TEST;

export const connectToDatabase = async () => {
  try {
    const connectionString = uri;
    if (!connectionString) {
      throw new Error(
        "Connection string is not defined in environment variables."
      );
    }

    console.log("Connecting to MongoDB Atlas...");

    const options = {
      serverApi: {
        version: "1",
        strict: true,
        deprecationErrors: true,
      },
    };

    mongoose.connection.on("connecting", () => {
      console.log("Connecting to MongoDB Atlas... ⏳");
    });

    mongoose.connection.on("connected", () => {
      console.log("Connected to MongoDB Atlas! ⭐⭐⭐");
    });

    mongoose.connection.on("disconnected", () => {
      console.log(
        "Disconnected from MongoDB Atlas. Attempting to reconnect... 🔄"
      );
    });

    mongoose.connection.on("error", (error) => {
      console.error("Error connecting to MongoDB Atlas:", error);
    });

    await mongoose.connect(connectionString, options);

    return mongoose.connection;
  } catch (error) {
    console.error("Error connecting to MongoDB Atlas:", error);
    throw error;
  }
};

process.on("SIGINT", async () => {
  try {
    await mongoose.connection.close();
    console.log("MongoDB connection closed 👋");
    process.exit(0); // Exiting the process gracefully
  } catch (error) {
    console.error("Error closing MongoDB connection:", error);
    process.exit(1); // Exiting the process with an error
  }
});
