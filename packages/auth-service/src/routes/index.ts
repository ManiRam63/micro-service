import express from 'express'
import AuthController from '../features/auth/auth.controller'
const router = express.Router()
router.use('/login', AuthController.signIn)
export default router
