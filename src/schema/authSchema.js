import { z } from "zod";

// Schema for user registration body
export const registerSchema = z.object({
  body: z.object({
    name: z
      .string({ required_error: "Name is required" })
      .min(2, "Name must be at least 2 characters long")
      .trim(),
    email: z
      .string({ required_error: "Email is required" })
      .email("Invalid email format"),
    password: z
      .string({ required_error: "Password is required" })
      .min(6, "Password must be at least 6 characters long"),
    role: z
      .enum(["user", "admin"], {
        errorMap: () => ({ message: "Role must be either 'user' or 'admin'" }),
      })
      .optional()
      .default("user"),
  }),
});

// Schema for user login body
export const loginSchema = z.object({
  body: z.object({
    email: z
      .string({ required_error: "Email is required" })
      .email("Invalid email format"),
    password: z
      .string({ required_error: "Password is required" })
      .min(6, "Password must be at least 6 characters long"),
  }),
});

// Schema for forgot password body
export const forgotPasswordSchema = z.object({
  body: z.object({
    email: z
      .string({ required_error: "Email is required" })
      .email("Invalid email format"),
  }),
});

// Schema for reset password body
export const resetPasswordSchema = z.object({
  body: z.object({
    userId: z
      .string({ required_error: "User ID is required" })
      .refine(
        (val) => /^[0-9a-fA-F]{24}$/.test(val),
        "Invalid userId format (must be a valid MongoDB ObjectId)"
      ),
    token: z
      .string({ required_error: "Token is required" })
      .min(1, "Token cannot be empty"),
    password: z
      .string({ required_error: "Password is required" })
      .min(6, "Password must be at least 6 characters long"),
  }),
});

// Schema for updating user data
export const updateUserSchema = z.object({
  body: z
    .object({
      name: z.string().min(1, "Name cannot be empty").trim().optional(),
      email: z.string().email("Invalid email format").optional(),
      password: z
        .string()
        .min(6, "Password must be at least 6 characters long")
        .optional(),
    })
    .refine(
      (data) => Object.keys(data).length > 0,
      "At least one field must be provided for update"
    ),
});
