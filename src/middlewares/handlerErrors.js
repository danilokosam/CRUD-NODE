const handlerError = (err, req, res, next) => {
    let message = err.message
    let statusCode = err.statusCode

    if (!statusCode) {
        res.status(500).json('Internal Server Error')
    }

    res.status(statusCode).json(message)
}

export default handlerError