import ApiError from "../utils/apiError.js"
import jwt from 'jsonwebtoken'
import config from "../config/config.js"

export const verifyToken = (req, res, next) => {
    try {
        const token = req.cookies.access_token
        if (!token) {
            throw new ApiError('Forbidden', 403)
        }
        const data = jwt.verify(token, config.jwtSecret)
        req.user = data
        next()
    } catch (err) {
        next(err)
    }
}

export const verifyPermissions = (...roles) => {
    return (req, res, next) => {
        const user = req.user
        if (roles.includes(user.role)) {
            next()
        } else {
            throw new ApiError('Unhautorized', 401)
        }
    }
}