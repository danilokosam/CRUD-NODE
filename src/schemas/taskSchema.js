const joi = require('joi')

const createTaskSchema = joi.object({
    title: joi.string().required(),
    description: joi.string().required()
})

const updateTaskSchema = joi.object({
    title: joi.string(),
    description: joi.string()
})

const getTaskSchema = joi.object({
    id: joi.string().required()
})

module.exports = { getTaskSchema, createTaskSchema, updateTaskSchema }