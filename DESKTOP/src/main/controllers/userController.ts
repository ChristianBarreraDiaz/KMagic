import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'

const prisma = new PrismaClient()

export async function getAllUsers(_req: Request, res: Response): Promise<void> {
  try {
    const users = await prisma.usuario.findMany({
      where: {
        Estado: {
          EST_DSC: true
        }
      }
    })
    console.log('🚀 ~ file: server.ts:39 ~ app.get ~ users:', users)
    res.json(users)
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message })
    }
  }
}
