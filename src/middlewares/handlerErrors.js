import logger from "../utils/logger.js"

const handlerError = (err, req, res, next) => {
    let message = err.message
    let statusCode = err.statusCode || 500
    logger.error(message)
    res.status(statusCode).json(message)
}

export default handlerError