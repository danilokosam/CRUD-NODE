import productModel from '../models/productModel.js'
import ApiError from '../utils/apiError.js'

export default class ProductService {
    
    async getAllProducts() {
        const products = await productModel.find().lean()
        return products
    }

    async getOneProduct(id) {
        const product = await productModel.findOne({ _id: id }).lean()
        if (!product) {
            throw new ApiError('No se encontro el producto', 404)
        }
        return product
    }

    async createProduct(product) {
        const result = await productModel.create(product)
        return result
    }

    async updateProduct(id, body) {
        const product = await productModel.findByIdAndUpdate(id, body, { new: true })
        if (!product) {
            throw new ApiError('No se encontro el producto', 404)
        }
        return product
    }

    async deleteProduct(id) {
        const product = await productModel.findByIdAndDelete(id)
        if (!product) {
            throw new ApiError('No se encontro el producto', 404)
        }
        return 'Producto eliminado'
    }

}