import bcrypt from 'bcrypt'
import { PrismaClient, Usuario } from '@prisma/client'
import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import Store from 'electron-store'
import { updateIoToken } from '../server'
import { randomUUID } from 'node:crypto'
// import {socket} from '../server'

const store = new Store()
const prisma = new PrismaClient()

export async function login(req: Request, res: Response): Promise<void> {
  try {
    const { username, password } = req.body

    const user: Usuario | null = await prisma.usuario.findUnique({
      where: {
        USU_USR: username
      }
    })

    const passwordsMatch = user?.USU_PSS && (await bcrypt.compare(password, user.USU_PSS))

    if (passwordsMatch) {
      // Generate JWT token
      // const storedRoomIdentifier = store.get('roomIdentifier')
      const storedRoomIdentifier = randomUUID()
      // console.log(
      //   '🚀 ~ file: authController.ts:42 ~ login ~ import.meta.env.M_VITE_SECRET:',
      //   import.meta.env.M_VITE_SECRET
      // )
      const token = jwt.sign(
        { userId: user.USU_ID, username: user.USU_USR, roomId: storedRoomIdentifier },
        import.meta.env.M_VITE_SECRET,
        { expiresIn: '8h' } // Set expiration time, e.g., 1 hour
      )
      // Save the roomIdentifier to electron-store
      store.set('token', token)
      store.get('roomIdentifier', storedRoomIdentifier)

      const decodedToken = readTokenData(token)
      console.log('🚀 ~ file: authController.ts:35 ~ login ~ decodedToken:', decodedToken)

      await updateIoToken(token)

      res.json({ token })
    } else {
      res.status(401).json({ message: 'Invalid username or password' })
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message })
    }
  }
}

export function readTokenData(
  token: string
): { userId: string; username: string; roomId: string } | null {
  try {
    // console.log(
    //   '🚀 ~ file: authController.ts:55 ~ decodedToken ~ import.meta.env.M_VITE_SECRET:',
    //   import.meta.env.M_VITE_SECRET
    // )
    const decodedToken = jwt.verify(token, import.meta.env.M_VITE_SECRET) as {
      userId: string
      username: string
      roomId: string
    }
    return decodedToken
  } catch (error) {
    console.error('Error decoding token:', error)
    return null
  }
}

export async function getToken(_req: Request, res: Response): Promise<void> {
  try {
    const token = store.get('token')
    console.log('🚀 ~ file: authController.ts:68 ~ getToken ~ token:', token)

    res.json({ token: typeof token === 'string' && token ? token : null })
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message })
    }
  }
}

export async function verifyToken(req: Request, res: Response): Promise<void> {
  try {
    const { token } = req.body
    console.log('🚀 ~ file: authController.ts:81 ~ verifyToken ~ req.body:', req.body)

    if (!token) {
      res.status(401).json({ message: 'Invalid token', status: false })
      return
    }
    const decodedToken = readTokenData(token)
    console.log('🚀 ~ file: authController.ts:98 ~ verifyToken ~ decodedToken:', decodedToken)

    if (
      typeof decodedToken?.roomId !== 'string' ||
      typeof decodedToken?.userId !== 'string' ||
      typeof decodedToken?.username !== 'string'
    ) {
      res.status(401).json({ message: 'Invalid token', status: false })
    } else {
      res.status(200).json({ message: 'Valid token', status: true })
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message, status: false })
    }
  }
}
