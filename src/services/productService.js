import { Product } from "../models/productModel.js";
import { executeDbOperation } from "../utils/executeDbOperation.js";

export const getAllProducts = async () => {
  return executeDbOperation(
    () => Product.find().lean(),
    "Error fetching products"
  );
};

export const getProductById = async (productId) => {
  return executeDbOperation(
    () => Product.findById(productId),
    "Error fetching product"
  );
};

export const getProductByCode = async (productCode) => {
  return executeDbOperation(
    () => Product.findOne({ productCode }),
    "Error fetching product"
  );
};

export const createProduct = async (productData) => {
  return executeDbOperation(
    () => Product.create(productData),
    "Error creating product"
  );
};

export const updateProduct = async (productId, productData) => {
  return executeDbOperation(
    () => Product.findByIdAndUpdate(productId, productData, { new: true }),
    "Error updating product"
  );
};

export const deleteProduct = async (productId) => {
  return executeDbOperation(
    () => Product.findByIdAndDelete(productId),
    "Error deleting product"
  );
};
