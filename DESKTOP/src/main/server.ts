// server/server.ts
import { io } from 'socket.io-client'
import express from 'express'
import Store from 'electron-store'
import cors from 'cors'
import { userRoutes } from './routes/userRoutes'
import { authRoutes } from './routes/authRoutes'
import 'dotenv/config'
import { tokenRoutes } from './routes/tokenRoutes'
import { keyboard, Key } from '@nut-tree/nut-js'
import { readTokenData } from './controllers/authController'

type Token = {
  userId: string
  username: string
  roomId: string
}

const store = new Store()
const app = express()
// eslint-disable-next-line prefer-const
let socket = io(import.meta.env.M_VITE_SOCKET_URL, {
  auth: {
    token: store.get('token')
  }
})

const corsOptions = {
  origin: import.meta.env.M_VITE_REACT_URL || 'http://localhost:5173',
  methods: ['GET', 'POST']
}
app.use(cors(corsOptions))
app.use(express.json())

app.use('/users', userRoutes)
app.use('/auth', authRoutes)
app.use('/token', tokenRoutes)

// testing - get room identifier
// app.get('/roomID', (_req, res) => {
//   const storedRoomIdentifier = store.get('roomIdentifier')
//   console.log(`Stored room identifier: ${storedRoomIdentifier}`)
//   res.json({ roomIdentifier: storedRoomIdentifier })
// })

// testing - allow to revoke token
app.get('/clean', (_req, res) => {
  const token = store.get('token')
  const storedRoomIdentifier = store.get('roomIdentifier')
  store.delete('roomIdentifier')
  store.delete('token')
  res.json({ message: `Token deleted: ${token} and roomId: ${storedRoomIdentifier}` })
})

// testing - sets old token
app.get('/set-old-token', (_req, res) => {
  store.delete('token')
  store.set(
    'token',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJkZDRjMzc3Zi1lNTNhLTQxMmUtOGFiZS1iOWJiNTYwMmNjNmUiLCJ1c2VybmFtZSI6ImNyaXN0aG9mZXJAa2V5bWFnaWMuY2wiLCJyb29tSWQiOiIyMWQyMjZiNi04ZWRiLTQzMjktYjdlMi0zZTk4ZGY0NzhkOWYiLCJpYXQiOjE3MDM4OTg0OTUsImV4cCI6MTcwMzkyNzI5NX0.Ewk4AZOnhrjvfis-DBY23JaqhG93zdSjbHSXw03yvYo'
  )
  const token = store.get('token')
  res.json({ message: `Token saved: ${token}` })
})

async function updateIoToken(token: string): Promise<void> {
  // Close the existing socket connection
  socket.disconnect()
  console.log('Disconnected from Socket.IO')

  // Reconnect with the updated token
  socket = io(import.meta.env.M_VITE_SOCKET_URL, {
    auth: {
      token: token
    }
  })

  socket.on('connect', () => {
    console.log('Connected to Socket.IO:', socket.id)

    // Ensure the token is still valid before emitting events
    if (typeof token !== 'string' || readTokenData(token) === null) {
      console.log('Token is not valid')
      return
    }

    const { userId, roomId, username } = readTokenData(token) as Token
    console.log('Room ID from update-socket:', roomId)
    console.log('User ID from update-socket:', userId)
    console.log('Username from update-socket:', username)

    // const token = store.get('token')
    // if (typeof token !== 'string') return console.log('Token is not a string')
    // if (readTokenData(token) === null) return console.log('Token is not valid')
    // const { userId, roomId, username } = readTokenData(token) as Token
    // console.log('🚀 ~ file: server.ts:78 ~ socket.on ~ roomId:', roomId)
    // console.log('🚀 ~ file: server.ts:78 ~ socket.on ~ userId:', userId)
    // console.log('🚀 ~ file: server.ts:78 ~ socket.on ~ username:', username)

    socket.emit('joinRoom', roomId)
    console.log('Emitted createRoom event update-socket')
  })

  socket.on('roomInfo', (data) => {
    const roomIdentifier = data.room
    console.log(`Received room identifier: ${roomIdentifier}`)

    // Save the roomIdentifier to electron-store
    store.set('roomIdentifier', roomIdentifier)

    // Log to check if the value is stored correctly
    const storedRoomIdentifier = store.get('roomIdentifier')
    console.log(`Stored room identifier: ${storedRoomIdentifier}`)
  })

  socket.on('receiveData', ({ keys }) => {
    console.log('Received receiveData event update-socket:', keys)
    // Assuming that data.keys is an array of Key enum values
    if (keys && Array.isArray(keys)) {
      // Execute keyboard actions based on the received keys
      executeKeyboardActions([...keys])
      console.log('Executed keyboard actions update-socket')
    }
  })

  socket.on('disconnect', () => {
    console.log('Disconnected from Socket.IO update-socket')
  })
}

// Function to execute keyboard actions based on the received data
function executeKeyboardActions(keys: Key[]): void {
  console.log('🚀 ~ file: server.ts:47 ~ executeKeyboardActions ~ keys:', keys)
  keys.forEach(async (key) => {
    console.log('🚀 ~ file: server.ts:51 ~ keys.forEach ~ key:', key)
    await keyboard.type(key)
  })
}

socket.on('connect', () => {
  console.log('socket id:', socket.id)
  console.log('A user connected')

  // Save the roomIdentifier to electron-store
  const token = store.get('token')
  if (typeof token !== 'string') return console.log('Token is not a string')
  if (readTokenData(token) === null) return console.log('Token is not valid')
  const { userId, roomId, username } = readTokenData(token) as Token
  console.log('🚀 ~ file: server.ts:78 ~ socket.on ~ roomId:', roomId)
  console.log('🚀 ~ file: server.ts:78 ~ socket.on ~ userId:', userId)
  console.log('🚀 ~ file: server.ts:78 ~ socket.on ~ username:', username)

  socket.emit('joinRoom', roomId)
})

// Handle 'roomInfo' event from the server
//get room identifier
socket.on('roomInfo', (data) => {
  const roomIdentifier = data.room
  console.log(`Received room identifier: ${roomIdentifier}`)

  // Save the roomIdentifier to electron-store
  store.set('roomIdentifier', roomIdentifier)

  // Log to check if the value is stored correctly
  const storedRoomIdentifier = store.get('roomIdentifier')
  console.log(`Stored room identifier: ${storedRoomIdentifier}`)
})

// Handle custom event to receive JSON data from Next.js
socket.on('receiveData', ({ keys }) => {
  console.log('Received data from Next.js:', keys)
  // Assuming that data.keys is an array of Key enum values
  if (keys && Array.isArray(keys)) {
    // Execute keyboard actions based on the received keys
    executeKeyboardActions([...keys])
    console.log('Executed keyboard actions')
  }
})

socket.on('disconnect', () => {
  console.log('User disconnected')
})

export { app as appExpress, socket, updateIoToken }
