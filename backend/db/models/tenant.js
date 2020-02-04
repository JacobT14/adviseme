import sequelize from '../db'

export const Tenant = sequelize.define('tenant', {
  // attributes
  name: {
    type: sequelize.Sequelize.STRING,
    allowNull: false
  },
})

export default Tenant