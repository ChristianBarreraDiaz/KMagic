// server/socketMiddleware.ts
import { Request, Response, NextFunction } from 'express'
import { io, Socket } from 'socket.io-client'
import Store from 'electron-store'

const store = new Store()

let socket: Socket | null = null

type CustomRequest = Request & {
  customSocket?: Socket | null
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const socketMiddleware = async (req: CustomRequest, _res: Response, next: NextFunction) => {
  // If the socket is not connected and the token is available, establish the connection
  if (!socket && store.get('token')) {
    socket = io(import.meta.env.M_VITE_SOCKET_URL || 'http://localhost:3001', {
      auth: {
        token: store.get('token')
      }
    })

    // Handle socket events once during the first connection
    socket.once('connect', () => {
      console.log('Socket connected:', socket?.id)
    })

    socket.once('disconnect', () => {
      console.log('Socket disconnected')
      socket = null // Reset socket instance on disconnect to allow reconnect on the next request
    })
  }

  // Attach the socket instance to the request object
  req.customSocket = socket

  // Continue to the next middleware or route handler
  next()
}
