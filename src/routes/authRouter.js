import express from "express";
import * as authController from "../controllers/authController.js";
import validate from "../middlewares/validationMiddleware.js";
import {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  updateUserSchema,
} from "../schema/authSchema.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import roleMiddleware from "../middlewares/roleMiddleware.js";

const router = express.Router();

// Route for registering a new user
router.post(
  "/register",
  validate(registerSchema),
  authController.registerHandler
);

// Protected route for admins to register new users
router.post(
  "/register-admin",
  authMiddleware,
  roleMiddleware(["admin"]),
  validate(registerSchema),
  authController.registerAdminHandler
);

// Route for user login
router.post("/login", validate(loginSchema), authController.loginHandler);

// Route for requesting a password reset
router.post(
  "/forgot-password",
  validate(forgotPasswordSchema),
  authController.forgotPasswordHandler
);

// Route for resetting the password
router.post(
  "/reset-password",
  validate(resetPasswordSchema),
  authController.resetPasswordHandler
);

// Route for updating user data
router.patch(
  "/update-user",
  authMiddleware,
  validate(updateUserSchema),
  authController.updateUserHandler
);

export default router;
