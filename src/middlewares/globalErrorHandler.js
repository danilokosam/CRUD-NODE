import { AppError } from "../utils/appError.js";

export const errorHandler = (err, _req, res, _next) => {
  // Check if the error is an instance of AppError
  if (err instanceof AppError) {
    try {
      // Parse the error message to extract the message and errors
      const parsedMessage = JSON.parse(err.message);

      // Return a response with status, parsed message details, and stack trace if in development mode
      return res.status(err.statusCode).json({
        status: err.status, // "error" (< 500) or "fail" (>= 500) from AppError
        ...parsedMessage, // Spread parsed message (e.g., { message, errors })
        stack: process.env.NODE_ENV === "development" ? err.stack : undefined, // Include stack trace in development mode
      });
    } catch {
      // If parsing fails, return a generic error response
      return res.status(err.statusCode).json({
        status: err.status, // "error" (< 500) or "fail" (>= 500) from AppError
        message: err.message, // Use the raw message as fallback
        stack: process.env.NODE_ENV === "development" ? err.stack : undefined, // Include stack trace in development mode
      });
    }
  }

  // Handle unexpected errors ( not instances of AppError)
  const statusCode = err.statusCode || 500; // Default to 500 if no statusCode is provided
  const status = err.status || "fail"; // Default to "fail" for server errors

  // Return a generic error response for unexpected errors
  res.status(statusCode).json({
    status, // "fail" or custom status if provided
    message: err.message || "Something went wrong 😢", // Custom generic message
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined, // Include stack trace in development mode
  });
};
