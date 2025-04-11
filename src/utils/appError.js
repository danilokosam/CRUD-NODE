/**
 * A custom error class for operational errors in the application.
 * Extends the built-in Error class with additional properties for HTTP status and operational status.
 */
export class AppError extends Error {
  /**
   * Creates an instance of AppError.
   * @param {string} message - The error message to display.
   * @param {number} statusCode - The HTTP status code associated with the error (e.g., 400, 404, 500).
   */
  constructor(message, statusCode) {
    // Call the parent Error constructor with the provided message
    super(message);

    // Assign the HTTP status code to differentiate error types
    this.statusCode = statusCode;

    // Set the status as "error" for client errors (< 500) or "fail" for server errors (>= 500)
    this.status = statusCode < 500 ? "error" : "fail";

    // Mark this as an operational error (not a programming error) for error handling logic
    this.isOperational = true;

    // Capture the stack trace, excluding the constructor call from the stack for cleaner output
    // This helps identify where the error was instantiated in the application code
    Error.captureStackTrace(this, this.constructor);
  }
}
