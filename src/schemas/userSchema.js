import joi from 'joi'

export const createUser = joi.object({
    email: joi.string().email().required(),
    username: joi.string().max(30).min(5).required(),
    age: joi.number().positive().max(100).required(),
    password: joi.string().min(8).max(60).required()
})

export const loginUser = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(8).max(60).required()
})

export const updateUser = joi.object({
    email: joi.string().email(),
    username: joi.string().max(30).min(5),
    age: joi.number().positive(),
    password: joi.string().min(8).max(60)
})