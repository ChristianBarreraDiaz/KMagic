import jwt from 'jsonwebtoken'

export function generateJWT(userId: string, roomId: string): string {
  const secret = import.meta.env.M_VITE_SECRET ?? 'default_secret'
  const expiresIn = '8h'

  const payload = {
    userId,
    roomId
  }

  const token = jwt.sign(payload, secret, { expiresIn })

  return token
}
