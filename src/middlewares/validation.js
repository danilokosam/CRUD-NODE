const ApiError = require('./../utils/apiError')

const validatorHandler = (schema, property) => {
    return (req, res, next) => {
        const data = req[property]
        const { error } = schema.validate(data)
        if (error) {
            next(new ApiError(error, 404))
        }
        next()
    }
}

module.exports = validatorHandler