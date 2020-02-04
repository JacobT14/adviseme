import Users from '../../db/models/user'
import Boom from '@hapi/boom'
import { hashPassword } from '../helpers/hash-password'

export const createUser = async (args) => {
  const { email, firstName, lastName, password, tenantId, permissionLevel = 'UNAPPROVED' } = args
  await _verifyEmailAddressIsNotInUse({ email, tenantId })
  console.log('got here')
  return
  const passwordHash = hashPassword(password)
  const user = {
    id: email, firstName, lastName, passwordHash, tenantId, permissionLevel,
  }
  const returnUser = await Users.create(user)
  return returnUser
}

const _verifyEmailAddressIsNotInUse = async ({ email, tenantId }) => {
  const user = await Users.findByPk(email)
  if (user) {
    const error = Boom.conflict('User already exists')
    error.output.payload.details =
      { code: 'API.ALREADY_EXISTS' }

    throw error
  }
}