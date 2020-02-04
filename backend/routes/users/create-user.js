

export const createUser = async (args) => {
  const {email, firstName, lastName, password, tenantId, permissionLevel = "UNAPPROVED" } = args
  await _verifyEmailAddressIsNotInUse({email,  tenantId})
  const passwordHash = crypto
    .createHash('md5')
    .update(`${password}`)
    .digest('hex')
    .toUpperCase()
  const users = {
    tenantId: tenantId,
    userId: email,
    firstName,
    lastName,
    password: passwordHash,
    permissionLevel
  }
  return users
}

const _verifyEmailAddressIsNotInUse = async (args) => {
  //TODO
  return false
}