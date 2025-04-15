import express from 'express'
import { register, login, getProfile, logout, refreshToken } from '../controllers/authController.js'
import validatorHandler from '../middlewares/validation.js'
import { createUser, updateUser, loginUser } from '../schemas/userSchema.js'
import { verifyToken, verifyPermissions } from '../middlewares/auth.js'
const router = express.Router()

router.post('/register', validatorHandler(createUser, 'body'), register)
router.post('/login', validatorHandler(loginUser, 'body'), login)
router.post('/logout', logout)
router.post('/refresh-token', refreshToken)
router.get('/profile', verifyToken, getProfile)
router.get('/admins', verifyToken, verifyPermissions('admin'), getProfile) // prueba middleware de roles

export default router