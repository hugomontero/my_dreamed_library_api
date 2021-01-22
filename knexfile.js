// Update with your config settings.
require("dotenv").config()
const { ENVIRONMENT : {
  database: { 
    operative: { database, host, user, password },
    testing: { test_host, test_database, test_user, test_password }
  },
}} = require("./src/config/constants")
module.exports = {
  development: {
    client: 'mysql',
    connection: {host,database,user,password},
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: __dirname + '/__migrations__'
    }
  },
  test:  {
    client: 'mysql',
    connection: {test_host, test_database, test_user, test_password},
    pool: {
      min: 2,
      max: 10
    },
    migrations:{
      tableName: 'knex_migrations',
      directory: __dirname__ = '__migrations__'
    }
  }

};
