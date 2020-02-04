import { getUserById } from './get-user-by-id'

export const editUser = async (args) => {
  const { userId, firstName, lastName, password, tenantId, permissionLevel = 'ADVISOR' } = args
  const user = await getUserById({ userId: userId })
  if(!user) {
    throw 'API.NOT_FOUND'
  }
  const passwordHash = crypto
    .createHash('md5')
    .update(`${password}`)
    .digest('hex')
    .toUpperCase()
  const users = {
    tenantId: tenantId,
    userId: userId,
    firstName,
    lastName,
    password: passwordHash,
    permissionLevel,
  }
  return users
}