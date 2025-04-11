import { z } from "zod";

export const getProductSchema = z.object({
  params: z.object({
    productId: z.string().refine((val) => /^[0-9a-fA-F]{24}$/.test(val), {
      message:
        "Invalid product ID format. It should be a 24-character hex string.",
    }),
  }),
});

export const createProductSchema = z.object({
  body: z.object({
    name: z
      .string()
      .trim()
      .min(1, "Name must be at least 1 character long")
      .max(50, "Name must be at most 50 characters long"),
    description: z
      .string()
      .trim()
      .min(1, "Description must be at least 1 character long")
      .max(500, "Description must be at most 500 characters long"),
    price: z.number().nonnegative("Price cannot be negative"),
    availability: z
      .number()
      .int("Availability must be an integer")
      .nonnegative("Availability cannot be negative")
      .optional(),
    productCode: z
      .string()
      .min(6, "Product code must be at least 6 characters long")
      .refine((val) => /^PROD-\w+$/.test(val), {
        message:
          "Product code must start with 'PROD-' followed by alphanumeric characters",
      }),
  }),
});

export const getProductByCodeSchema = z.object({
  params: z.object({
    productCode: z
      .string()
      .min(6, "Product code must be at least 6 characters long")
      .refine((val) => /^PROD-\w+$/.test(val), {
        message:
          "Product code must start with 'PROD-' followed by alphanumeric characters",
      }),
  }),
});

export const updateProductSchema = z.object({
  body: z
    .object({
      name: z
        .string()
        .trim()
        .min(1, "Name must be at least 1 character long")
        .max(50, "Name must be at most 50 characters long")
        .optional(),
      description: z
        .string()
        .trim()
        .min(1, "Description must be at least 1 character long")
        .max(500, "Description must be at most 500 characters long")
        .optional(),
      price: z.number().nonnegative("Price cannot be negative").optional(),
      availability: z
        .number()
        .int("Availability must be an integer")
        .nonnegative("Availability cannot be negative")
        .optional(),
      productCode: z
        .string()
        .min(6, "Product code must be at least 6 characters long")
        .refine((val) => /^PROD-\w+$/.test(val), {
          message:
            "Product code must start with 'PROD-' followed by alphanumeric characters",
        })
        .optional(),
    })
    .refine((body) => Object.keys(body).length > 0, {
      message: "At least one field must be provided to update",
    }),
  params: z.object({
    productId: z.string().refine((val) => /^[0-9a-fA-F]{24}$/.test(val), {
      message:
        "Invalid product ID format. It should be a 24-character hex string.",
    }),
  }),
});
