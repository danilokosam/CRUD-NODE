import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import userModel from './../models/userModel.js'
import ApiError from '../utils/apiError.js'
import config from '../config/config.js'

class authService {

    register = async (data) => {
        const hashPassword = await bcrypt.hash(data.password, 10)
        const user = {
            ...data,
            password: hashPassword,
            role: 'user'
        }
        const isUserDuplicated = await userModel.findOne({ email: user.email }).lean()
        if (isUserDuplicated) {
            throw new ApiError('This user already exists', 409)
        }
        const result = await userModel.create(user)
        return result
    }

    checkUser = async (email, password ) => {
        const user = await userModel.findOne({ email }).select('+password')
        if (!user) {
            throw new ApiError('Not found', 404)
        }
        const isUser = await bcrypt.compare(password, user.password)
        if (!isUser) {
            throw new ApiError('incorrect credentials', 401)
        }
        return user
    }

    signin = async (user) => {
        if (!user) {
            throw new ApiError('Forbidden', 403)
        }
        const { role, _id } = user
        const accessToken = jwt.sign({ role, id: _id }, config.jwtSecret, { expiresIn: '1h' })
        const refreshToken = jwt.sign({ role, id: _id }, config.jwtSecretRefresh, { expiresIn: '7d' })
        user.refreshToken = refreshToken
        await user.save()
        return { accessToken, refreshToken }
    }

    login = async (email, password) => {
        const user = await this.checkUser(email, password)
        const tokens = await this.signin(user)
        return tokens
    }

    getUser = async (id) => {
        const user = await userModel.findOne({ _id: id }).lean()
        if (!user) {
            throw new ApiError('Not found', 404)
        }
        return user
    }

    refreshToken = async (oldRefreshToken) => {
        if (!oldRefreshToken) {
            throw new ApiError('Somenthing goes wrong', 400)
        }
        try {
            const verifyResult = jwt.verify(oldRefreshToken, config.jwtSecretRefresh)
            const { id } = verifyResult
            const user = await userModel.findById(id)
            const newAccessToken = jwt.sign({ id: user._id, role: user.role }, config.jwtSecret, { expiresIn: '1h' })
            const newRefreshToken = jwt.sign({ id: user._id, role: user.role }, config.jwtSecretRefresh, { expiresIn: '7d' })
            user.refreshToken = newRefreshToken
            user.save()
            return { newAccessToken, newRefreshToken }
        } catch (err) {
            throw new ApiError('Somenthing goes wrong', 400)
        }
    }

    logout = async (token) => {
        if (!token) {
            throw new ApiError('no content', 204)
        }
        
        const user = await userModel.findOne({ refreshToken: token })
        if (user) {
        user.refreshToken = null
            await user.save()
        }
    }
}

export default authService