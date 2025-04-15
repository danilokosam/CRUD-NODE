import { AppError } from "../utils/appError";

describe("AppError", () => {
  test("should create an error with correct properties for client error (400)", () => {
    const error = new AppError("Bad request", 400);

    expect(error.message).toBe("Bad request");
    expect(error.statusCode).toBe(400);
    expect(error.status).toBe("error");
    expect(error.isOperational).toBe(true);
    expect(error.stack).toBeDefined();
  });

  test("should create an error with correct properties for server error (500)", () => {
    const error = new AppError("Server error", 500);

    expect(error.message).toBe("Server error");
    expect(error.statusCode).toBe(500);
    expect(error.status).toBe("fail");
    expect(error.isOperational).toBe(true);
    expect(error.stack).toBeDefined();
  });

  test("should inherit from Error", () => {
    const error = new AppError("Test error", 404);
    expect(error).toBeInstanceOf(Error);
    expect(error).toBeInstanceOf(AppError);
  });
});
