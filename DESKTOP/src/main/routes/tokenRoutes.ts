// routes/tokenRoutes.ts
import express from 'express'
import { getToken, verifyToken } from '../controllers/authController'

const router = express.Router()

router.get('/', getToken)
router.post('/verify', verifyToken)

export { router as tokenRoutes }
