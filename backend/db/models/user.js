import sequelize from '../db'

export const User = sequelize.define('user', {
  // attributes
  firstName: {
    type: sequelize.Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type:  sequelize.Sequelize.STRING,
    // allowNull defaults to true
  },
  permissionLevel: {
    type:  sequelize.Sequelize.STRING,
    allowNull: false,
    defaultValue: "ADVISOR"
  },
  tenantId: {
    type:  sequelize.Sequelize.STRING,
    allowNull: false
  }
})

export default User