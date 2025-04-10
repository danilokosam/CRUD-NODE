import express from "express";
import * as productController from "../controllers/productController.js";

const router = express.Router();

// Route for getting all products
router.get("/", productController.getAllProductsHandler);

// Route for getting a product by ID
router.get("/:productId", productController.getProductByIdHandler);

// Route for getting a product by code
router.get("/code/:productCode", productController.getProductByCodeHandler);

// Route for creating a new product
router.post("/", productController.createProductHandler);

// Route for updating a product by ID
router.put("/:productId", productController.updateProductHandler);

// Route for deleting a product by ID
router.delete("/:productId", productController.deleteProductHandler);

export default router;
