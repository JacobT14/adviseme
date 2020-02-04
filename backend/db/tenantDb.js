import { User } from './models/user'
import { Tenant } from './models/tenant'

export const _getTenantDb = async () => {
  await User.sync()
  await Tenant.sync()

  return {
    User,
    Tenant
  }
}