module.exports = {
  username: 'joeky497_tiago7',
  password: '1234qwerty',
  database: 'joeky497_7comm_bolo',
  options: {
    host: '192.185.211.194',
    dialect: 'mysql',
    port: 3306,
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
/*
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
*/