import { z } from "zod";

export const getProductSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
});

export const createProductSchema = z.object({
  body: z.object({
    name: z.string().min(1).max(50),
    description: z.string().min(1).max(500),
    price: z.number().positive(),
    availability: z.number().int().nonnegative(),
    productCode: z.string().uuid(),
  }),
});

export const updateProductSchema = z.object({
  body: z
    .object({
      name: z.string().min(3).max(255).optional(),
      description: z.string().optional(),
      price: z.number().positive().optional(),
      availability: z.number().int().nonnegative().optional(),
      productCode: z.string().min(5).max(50).optional(),
    })
    .partial(),
  params: z.object({
    id: z.string().min(24).max(24),
  }),
});
