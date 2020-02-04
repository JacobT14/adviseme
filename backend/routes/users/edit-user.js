import { getUserById } from './get-user-by-id'
import { hashPassword } from '../helpers/hash-password'

export const editUser = async (args) => {
  const { userId, firstName, lastName, password, permissionLevel = 'ADVISOR' } = args
  const user = await getUserById({ userId: userId })
  if(!user) {
    throw 'API.NOT_FOUND'
  }
  const passwordHash = hashPassword(password)
  const users = {
    userId: userId,
    firstName,
    lastName,
    password: passwordHash,
    permissionLevel,
  }
  return users
}