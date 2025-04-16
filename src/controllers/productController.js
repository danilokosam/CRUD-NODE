import ProductService from '../services/productService.js'
const Service = new ProductService()
import { client } from '../config/connection-cache.js'

export const getProducts = async (req, res, next) => {
    try {
        const reply = await client.get('products')
        if (reply) {
            return res.json(JSON.parse(reply))
        }
        const tasks = await Service.getAllProducts()
        await client.set('products', JSON.stringify(tasks), { EX: 60 * 5 })
        return res.json(tasks)
    } catch (err) {
        next(err)
    }
}

export const getTheProduct = async (req, res, next) => {
    try {
        const { id } = req.params
        const reply = await client.get(`product:${id}`)
        if (reply) {
            return res.json(JSON.parse(reply))
        }
        const tasks = await Service.getOneProduct(id)
        await client.set(`product:${id}`, JSON.stringify(tasks), { EX: 60 * 5 })
        return res.json(tasks)
    } catch (err) {
        next(err)
    }
}

export const produceProduct = async (req, res, next) => {
    try {
        const task = req.body
        const response = await Service.createProduct(task)
        await client.del('products')
        return res.status(201).json(response)
    } catch (err) {
        next(err)
    }
}

export const changeProduct = async (req, res, next) => {
    try {
        const { id } = req.params
        const task = req.body
        const response = await Service.updateProduct(id, task)
        await client.del(`product:${id}`)
        return res.json(response)
    } catch (err) {
        next(err)
    }
}

export const removeProduct = async (req, res, next) => {
    try {
        const { id } = req.params
        const response = await Service.deleteProduct(id)
        await client.del(`product:${id}`)
        await client.del('products')
        return res.json(response)
    } catch (err) {
        next(err)
    }
}