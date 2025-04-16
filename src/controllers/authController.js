import authService from '../services/authService.js'
import config from '../config/config.js'
import { client } from '../config/connection-cache.js'
const Service = new authService()

export const register = async (req, res, next) => {
    try {
        const user = req.body
        const newUser = await Service.register(user)
        res.status(201).json(newUser)
    } catch (err) {
        next(err)
    }
}

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const { accessToken, refreshToken } = await Service.login(email, password)
        res.status(201).cookie('access_token', accessToken, { 
            httpOnly: true, // esto significa que la cookie solo se puede acceder desde el servidor
            secure: config.nodeEnv == 'production', // si se coloca esto la cookie solo se puede acceder en https
            sameSite: 'strict', // la cookie solo se puede acceder desde el mismo dominio
            maxAge: 1000 * 60 * 60 // la cookie expira en una hora
        }).cookie('refresh_token', refreshToken, {
            httpOnly: true,
            secure: config.nodeEnv == 'production',
            sameSite: 'strict',
            maxAge: 1000 * 60 * 60 * 24 * 7
        }).json(accessToken)
    } catch (err) {
        next(err)
    }
}

export const logout = async (req, res, next) => {
    try {
        const token = req.cookies.refresh_token
        await Service.logout(token)
        res.clearCookie('access_token').clearCookie('refresh_token').json({ message: 'Logout successful' })
    } catch (err) {
        next(err)
    }
}

export const getProfile = async (req, res, next) => {
    try {
        const { id } = req.user
        const key = `cache:${id}:${req.originalUrl}`
        const reply = await client.get(key)
        if (reply) {
            return res.json(JSON.parse(reply))
        }
        const user = await Service.getUser(id)
        await client.set(key, JSON.stringify(user), { EX: 60 * 5 })
        return res.json(user)
    } catch (err) {
        next(err)
    }
}

export const refreshToken = async (req, res, next) => {
    try {
        const token = req.cookies.refresh_token
        const { newAccessToken, newRefreshToken } = await Service.refreshToken(token)
        res.cookie('access_token', newAccessToken, {
            httpOnly: true,
            secure: config.nodeEnv == 'production',
            sameSite: 'strict',
            maxAge: 1000 * 60 * 60
        }).cookie('refresh_token', newRefreshToken, {
            httpOnly: true,
            secure: config.nodeEnv == 'production',
            sameSite: 'strict',
            maxAge: 1000 * 60 * 60 * 24 * 7
        }).json(newAccessToken)
    } catch (err) {
        next(err)
    }
}

export const recoveryPassword = async (req, res, next) => {
    try {
        const { email } = req.body
        const token = await Service.recoveryPassword(email)
        await Service.sendRecovery(email, token)
        res.status(200).json({ message: 'Mail sent succesfuly' })
    } catch (err) {
        next(err)
    }
}

export const changePassword = async (req, res, next) => {
    try {
        const { token } = req.params
        const { newPassword } = req.body
        const result = await Service.changePassword(token, newPassword)
        res.status(200).json(result)
    } catch (err) {
        next(err)
    }
}