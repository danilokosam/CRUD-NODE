import express from 'express'
import { register, login, getProfile, logout, refreshToken, recoveryPassword, changePassword } from '../controllers/authController.js'
import validatorHandler from '../middlewares/validation.js'
import { createUser, loginUser } from '../schemas/userSchema.js'
import { verifyToken, verifyPermissions } from '../middlewares/auth.js'
const router = express.Router()

router.post('/register', validatorHandler(createUser, 'body'), register)
router.post('/login', validatorHandler(loginUser, 'body'), login)
router.post('/logout', logout)
router.post('/refresh-token', refreshToken)
router.get('/profile', verifyToken, getProfile)
router.get('/admins', verifyToken, verifyPermissions('admin'), getProfile) // prueba middleware de roles
router.post('/recovery-password', recoveryPassword)
router.post('/change-password/:token', changePassword)

export default router