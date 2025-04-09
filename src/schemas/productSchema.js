import joi from 'joi'

export const createProductSchema = joi.object({
    name: joi.string().required(),
    description: joi.string().required(),
    price: joi.number().required(),
    availability: joi.number().required()
})

export const updateProductSchema = joi.object({
    name: joi.string(),
    description: joi.string(),
    price: joi.number(),
    availability: joi.number()
})

export const getProductSchema = joi.object({
    id: joi.string().required()
})