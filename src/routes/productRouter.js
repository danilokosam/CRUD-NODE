import express from "express";
import * as productController from "../controllers/productController.js";
import validate from "../middlewares/validationMiddleware.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import roleMiddleware from "../middlewares/roleMiddleware.js";
import {
  getProductSchema,
  createProductSchema,
  updateProductSchema,
  getProductByCodeSchema,
} from "../schema/productSchema.js";

const router = express.Router();

// Route for getting all products ( requires authentication )
router.get("/", authMiddleware, productController.getAllProductsHandler);

// Route for getting a product by ID ( requires authentication )
router.get(
  "/:productId",
  authMiddleware,
  validate(getProductSchema),
  productController.getProductByIdHandler
);

// Route for getting a product by code ( requires authentication )
router.get(
  "/code/:productCode",
  authMiddleware,
  validate(getProductByCodeSchema),
  productController.getProductByCodeHandler
);

// Route for creating a new product ( requires authentication and admin role )
router.post(
  "/",
  authMiddleware,
  roleMiddleware(["admin"]),
  validate(createProductSchema),
  productController.createProductHandler
);

// Route for updating a product by ID ( requires authentication and admin role )
router.put(
  "/:productId",
  authMiddleware,
  roleMiddleware(["admin"]),
  validate(updateProductSchema),
  productController.updateProductHandler
);

// Route for deleting a product by ID ( requires authentication and admin role )
router.delete(
  "/:productId",
  authMiddleware,
  roleMiddleware(["admin"]),
  validate(getProductSchema),
  productController.deleteProductHandler
);

export default router;
