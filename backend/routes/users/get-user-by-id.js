

export const getUserById = async (args) => {
  const {userId } = args
  const passwordHash = crypto
    .createHash('md5')
    .update(`${password}`)
    .digest('hex')
    .toUpperCase()
  return {
    userId,
    firstName: "test",
    lastName: "user",
    permissionLevel: "PRIMARY_ADMIN",
    tenantId: "testTenantId"
  }
}