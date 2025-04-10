import logger from "../utils/logger.js"

const handlerError = (err, req, res, next) => {
    let message = err.message
    let statusCode = err.statusCode

    if (!statusCode) {
        logger.error('Internal Server Error')
        res.status(500).json('Internal Server Error')
    }
    logger.error(message)
    res.status(statusCode).json(message)
}

export default handlerError