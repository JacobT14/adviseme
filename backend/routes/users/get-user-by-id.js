import Users from '../../db/models/user'

export const getUserById = async (args) => {
  const {userId } = args
  return Users.findByPk(userId)
}