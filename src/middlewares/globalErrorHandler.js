import { AppError } from "../utils/appError.js";
export const errorHandler = (err, req, res, next) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
  }

  // if the error is not an instance of AppError
  const statusCode = err.statusCode || 500;
  const status = err.status || "fail";

  res.status(statusCode).json({
    status,
    message: err.message || "Something went wrong 😢",
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};
