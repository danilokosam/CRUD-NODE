import express from "express";
import * as productController from "../controllers/productController.js";
import validate from "../middlewares/validationMiddleware.js";
import {
  getProductSchema,
  createProductSchema,
  updateProductSchema,
  getProductByCodeSchema,
} from "../schema/productSchema.js";

const router = express.Router();

// Route for getting all products
router.get("/", productController.getAllProductsHandler);

// Route for getting a product by ID
router.get(
  "/:productId",
  validate(getProductSchema),
  productController.getProductByIdHandler
);

// Route for getting a product by code
router.get(
  "/code/:productCode",
  validate(getProductByCodeSchema),
  productController.getProductByCodeHandler
);

// Route for creating a new product
router.post(
  "/",
  validate(createProductSchema),
  productController.createProductHandler
);

// Route for updating a product by ID
router.put(
  "/:productId",
  validate(updateProductSchema),
  productController.updateProductHandler
);

// Route for deleting a product by ID
router.delete(
  "/:productId",
  validate(getProductSchema),
  productController.deleteProductHandler
);

export default router;
