import validate from "../middlewares/validationMiddleware";
import { z } from "zod";
import { AppError } from "../utils/appError";
import { jest } from "@jest/globals";

describe("validate middleware", () => {
  let req, res, next;

  const mockSchema = z.object({
    body: z.object({
      name: z.string().min(1, "Name is required"),
    }),
  });

  beforeEach(() => {
    req = {
      body: {},
      params: {},
      query: {},
    };
    res = {};
    next = jest.fn();
  });

  test("should assign validatedData and call next for valid data", async () => {
    req.body = { name: "Test" };
    const middleware = validate(mockSchema);

    await middleware(req, res, next);

    expect(req.validatedData).toBeDefined();
    expect(req.validatedData).toEqual({
      body: { name: "Test" },
      params: {},
      query: {},
    });
    expect(next).toHaveBeenCalledWith();
    expect(next).not.toHaveBeenCalledWith(expect.any(Error));
  });

  test("should throw AppError for invalid data", async () => {
    req.body = { name: "" };
    const middleware = validate(mockSchema);

    await middleware(req, res, next);

    expect(next).toHaveBeenCalledWith(expect.any(AppError));
    const error = next.mock.calls[0][0];
    expect(error).toBeInstanceOf(AppError);
    expect(error.statusCode).toBe(400);
    expect(error.status).toBe("error");
    const parsedMessage = JSON.parse(error.message);
    expect(parsedMessage).toEqual({
      message: "Validation error",
      errors: [
        {
          field: "body.name",
          message: "Name is required",
        },
      ],
    });
  });
});