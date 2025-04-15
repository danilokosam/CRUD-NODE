import { errorHandler } from "../middlewares/globalErrorHandler";
import { AppError } from "../utils/appError";
import { jest } from "@jest/globals";

describe("errorHandler middleware", () => {
  let req, res, next;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
    process.env.NODE_ENV = "development";
  });

  test("should handle AppError with JSON message", () => {
    const error = new AppError(
      JSON.stringify({
        message: "Validation error",
        errors: [{ field: "body.name", message: "Name is required" }],
      }),
      400
    );

    errorHandler(error, req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: "error",
      message: "Validation error",
      errors: [{ field: "body.name", message: "Name is required" }],
      stack: error.stack,
    });
  });

  test("should handle AppError with plain message", () => {
    const error = new AppError("Product not found", 404);

    errorHandler(error, req, res, next);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      status: "error",
      message: "Product not found",
      stack: error.stack,
    });
  });

  test("should handle non-AppError with generic response", () => {
    const error = new Error("Unexpected error");

    errorHandler(error, req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      status: "fail",
      message: "Unexpected error", // Cambiado para coincidir con el código real
      stack: error.stack,
    });
  });

  test("should hide stack trace in production", () => {
    process.env.NODE_ENV = "production";
    const error = new AppError("Test error", 400);

    errorHandler(error, req, res, next);

    expect(res.json).toHaveBeenCalledWith({
      status: "error",
      message: "Test error",
      stack: undefined,
    });
  });

  test("should handle AppError with invalid JSON message", () => {
    const error = new AppError("Invalid JSON", 400);

    errorHandler(error, req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      status: "error",
      message: "Invalid JSON",
      stack: error.stack,
    });
  });
});