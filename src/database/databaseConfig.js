const {
 ENVIRONMENT: {
  database: {
   operative: { host, user, password, database },
  },
 },
} = require("../config/constants")

const clientConfig = {
 client: "mysql",
 connection: { host, user, password, database },
}

const knex = require("knex")(clientConfig)

module.exports = knex
