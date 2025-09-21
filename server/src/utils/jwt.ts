import jwt from 'jsonwebtoken'

const getJWTSecret = (): string => {
  const secret = process.env.JWT_SECRET
  if (!secret) {
    throw new Error('JWT_SECRET is not defined in environment variables')
  }
  return secret
}

const JWT_EXPIRE = process.env.JWT_EXPIRE || '7d'

export interface JWTPayload {
  id: string
  [key: string]: any
}

export const generateToken = (payload: JWTPayload): string => {
  return jwt.sign(payload, getJWTSecret(), {
    expiresIn: JWT_EXPIRE,
    issuer: 'leher-platform',
    audience: 'leher-users'
  } as jwt.SignOptions)
}

export const generateResetToken = (payload: JWTPayload): string => {
  return jwt.sign(payload, getJWTSecret(), {
    expiresIn: '10m'
  } as jwt.SignOptions)
}

export const generateVerificationToken = (payload: JWTPayload): string => {
  return jwt.sign(payload, getJWTSecret(), {
    expiresIn: '24h'
  } as jwt.SignOptions)
}

export const verifyToken = (token: string): JWTPayload => {
  return jwt.verify(token, getJWTSecret(), {
    issuer: 'leher-platform',
    audience: 'leher-users'
  }) as JWTPayload
}
