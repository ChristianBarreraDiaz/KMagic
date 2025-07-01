// routes/userRoutes.ts
import express from 'express'
import { login } from '../controllers/authController'

const router = express.Router()

router.post('/signin', login)

export { router as authRoutes }
// routes/userRoutes.ts
