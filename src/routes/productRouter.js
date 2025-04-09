import { Router } from 'express'
const router = Router()
import { getProducts, getTheProduct, produceProduct, changeProduct, removeProduct } from './../controllers/productController.js'
import validatorHandler from '../middlewares/validation.js'
import { getProductSchema, createProductSchema, updateProductSchema } from '../schemas/productSchema.js'

router.get('/', getProducts)
router.get('/:id', validatorHandler(getProductSchema, 'params'), getTheProduct)
router.post('/', validatorHandler(createProductSchema, 'body'), produceProduct)
router.patch('/:id', validatorHandler(getProductSchema, 'params'), validatorHandler(updateProductSchema, 'body'), changeProduct)
router.delete('/:id', validatorHandler(getProductSchema, 'params'), removeProduct)

export default router