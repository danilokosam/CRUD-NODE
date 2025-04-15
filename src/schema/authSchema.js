import { z } from "zod";

// Schema for user registration body
export const registerSchema = z.object({
  body: z.object({
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
