import ProductService from '../services/productService.js'
const Service = new ProductService()

export const getProducts = async (req, res, next) => {
    try {
        const tasks = await Service.getAllProducts()
        res.json(tasks)
    } catch (err) {
        next(err)
    }
}

export const getTheProduct = async (req, res, next) => {
    try {
        const { id } = req.params
        const tasks = await Service.getOneProduct(id)
        res.json(tasks)
    } catch (err) {
        next(err)
    }
}

export const produceProduct = async (req, res, next) => {
    try {
        const task = req.body
        const response = await Service.createProduct(task)
        res.status(201).json(response)
    } catch (err) {
        next(err)
    }
}

export const changeProduct = async (req, res, next) => {
    try {
        const { id } = req.params
        const task = req.body
        const response = await Service.updateProduct(id, task)
        res.json(response)
    } catch (err) {
        next(err)
    }
}

export const removeProduct = async (req, res, next) => {
    try {
        const { id } = req.params
        const response = await Service.deleteProduct(id)
        res.json(response)
    } catch (err) {
        next(err)
    }
}