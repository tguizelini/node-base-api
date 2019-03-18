module.exports = {
  username: 'root',
  password: 'root',
  database: 'db_7cake',
  options: {
    host: 'localhost',
    dialect: 'mysql',
    port: 8889,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    define: {
      timestamps: false,
      underscored: true,
      freezeTableName: false,
      charset: 'utf8',
      dialectOptions: {
        collate: 'utf8_general_ci'
      }
    }
  }
}
