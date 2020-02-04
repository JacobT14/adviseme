export const permissions = {
  PRIMARY_ADMIN: [
    "users:edit",
    "users:create",
    "users:delete",
    "users:view",
    "permissions:change",
  ],
  UNAPPROVED: []
}

export const permissionsList = {
  USERS_EDIT: "users:edit",
  USERS_CREATE: "users:create",
  USERS_DELETE: "users:delete",
  USERS_VIEW: "users:view",
  PERMISSIONS_CHANGE: "permissions:change"
}

export const canTakeAction = ({user, action, tenantId}) => {
  if (user.tenantId !== tenantId) {
    throw 'API.UNAUTHORIZED'
  }
  else if (permissions[user.permissionLevel].includes(action)) {
    return true
  }
  else {
    throw 'API.UNAUTHORIZED'
  }
}