import crypto from 'crypto-js'

export const hashPassword = (password) => {
  const passwordHash = crypto.MD5(password).toString()
  return passwordHash
}