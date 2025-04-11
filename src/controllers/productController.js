import * as productService from "../services/productService.js";
import { AppError } from "../utils/appError.js";
import { tryCatchFn } from "../utils/tryCatch.js";

export const getAllProductsHandler = tryCatchFn(async (req, res, next) => {
  const products = await productService.getAllProducts();
  return res.status(200).json(products);
});

export const getProductByIdHandler = tryCatchFn(async (req, res, next) => {
  const { productId } = req.validatedData.params;
  const product = await productService.getProductById(productId);
  if (!product) {
    return next(new AppError("Product not found", 404));
  }
  return res.status(200).json(product);
});

export const getProductByCodeHandler = tryCatchFn(async (req, res, next) => {
  const { productCode } = req.validatedData.params;
  const product = await productService.getProductByCode(productCode);
  if (!product) {
    return next(new AppError("Product not found", 404));
  }
  return res.status(200).json(product);
});

export const createProductHandler = tryCatchFn(async (req, res, next) => {
  const productData = req.validatedData.body;
  const newProduct = await productService.createProduct(productData);
  return res.status(201).json(newProduct);
});

export const updateProductHandler = tryCatchFn(async (req, res, next) => {
  const { productId } = req.validatedData.params;
  const productData = req.validatedData.body;
  const updatedProduct = await productService.updateProduct(
    productId,
    productData
  );
  if (!updatedProduct) {
    return next(new AppError("Product not found", 404));
  }
  return res.status(200).json(updatedProduct);
});

export const deleteProductHandler = tryCatchFn(async (req, res, next) => {
  const { productId } = req.validatedData.params;
  const deletedProduct = await productService.deleteProduct(productId);
  if (!deletedProduct) {
    return next(new AppError("Product not found", 404));
  }
  return res.status(200).json({ message: "Product deleted successfully" });
});
