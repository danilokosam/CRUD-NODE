export class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = statusCode < 500 ? "error" : "fail";
    this.isOperational = true;

    // Error.captureStackTrace is a method that creates a stack trace for the error object.
    // It is used to capture the stack trace at the point where the error was created.
    Error.captureStackTrace(this, this.constructor);
  }
}
