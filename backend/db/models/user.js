import sequelize from '../db'

export const User = sequelize.define('user', {
  // attributes
  id: {
    type: sequelize.Sequelize.STRING,
    primaryKey: true
  },
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
  password: {
    type: sequelize.Sequelize.STRING
  },
  tenantId: {
    type:  sequelize.Sequelize.STRING,
    allowNull: false
  }
}, {
  alter: true
})

export default User