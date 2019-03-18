const Sequelize = require('sequelize')
const config = require('../config/database')

const sequelize = new Sequelize(
  config.database, 
  config.username, 
  config.password, 
  {
    host: config.options.host,
    port: config.options.port,
    dialect: config.options.dialect,
    pool: config.options.pool,
    define: config.options.define
  }
)

module.exports = sequelize
