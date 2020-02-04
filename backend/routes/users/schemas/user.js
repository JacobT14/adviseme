import Joi from '@hapi/joi'
import { permissions } from '../../helpers/can-take-action'


export const PermissionLevels = Joi.string().valid(...Object.keys(permissions))
export const userSchema = Joi.object({
  id: Joi.string(),
  firstName: Joi.string(),
  lastName: Joi.string(),
  permissionLevel: PermissionLevels,
  tenantId: Joi.string(),
}).label('user');

export const createUserSchema = Joi.object({
  email: Joi.string().required(), firstName:Joi.string().required() , lastName: Joi.string().required(), password: Joi.string().required(), tenantId: Joi.string().required(), permissionLevel: Joi.string().valid(...Object.keys(permissions), null)
}).label("createUser")

export const editUserSchema = Joi.object({
  email: Joi.string().required(), firstName:Joi.string().required() , lastName: Joi.string().required(), password: Joi.string().required(), tenantId: Joi.string().required(), permissionLevel: Joi.string().valid(...Object.keys(permissions), null)
}).label("editUser")

export const usersSchema = Joi.array().items(userSchema).label('users')