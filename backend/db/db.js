import { Sequelize } from 'sequelize'

console.log(process.env)
const sequelize = new Sequelize(process.env.DATABASE_USER, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {
  host: process.env.DATABASE_HOST,
  dialect: 'mysql'
})

export default sequelize