import * as authService from "../services/authService.js";
import { AppError } from "../utils/appError.js";
import { tryCatchFn } from "../utils/tryCatch.js";

export const registerHandler = tryCatchFn(async (req, res, next) => {
  const userData = req.validatedData.body;

  // Admins can only be created by other admins
  if (userData.role === "admin") {
    return next(
      new AppError(
        JSON.stringify({
          message: "Authorization error",
          errors: [
            {
              field: "role",
              message: "Admins can only be created by other admins",
            },
          ],
        }),
        403
      )
    );
  }

  userData.role = userData.role || "user";
  const { user, token } = await authService.registerUser(userData);

  return res.status(201).json({
    status: "success",
    data: { token },
  });
});

export const registerAdminHandler = tryCatchFn(async (req, res, next) => {
  const userData = req.validatedData.body;

  const { user, token } = await authService.registerUser(userData);

  return res.status(201).json({
    status: "success",
    data: { token },
  });
});

export const loginHandler = tryCatchFn(async (req, res, next) => {
  const { email, password } = req.validatedData.body;

  const result = await authService.loginUser({ email, password });
  if (!result) {
    return next(
      new AppError(
        JSON.stringify({
          message: "Authentication error",
          errors: [
            { field: "credentials", message: "Invalid email or password" },
          ],
        }),
        401
      )
    );
  }

  const { token } = result;

  return res.status(200).json({
    status: "success",
    data: { token },
  });
});
