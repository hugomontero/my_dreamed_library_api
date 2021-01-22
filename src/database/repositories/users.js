const knex = require("../databaseConfig")
const tableName = "users"
const { DBError } = require("../../config/errors/errorModel")

const getOneById = async (id) => {
 try {
  return knex(tableName).where("id", id).first()
 } catch (error) {
  console.log(error)
  throw new DBError("error on users getOneById")
 }
}

const getUsersByType = async (user_type) => {
 try {
  return knex(tableName).where({ user_type }).select()
 } catch (error) {
  console.log(error)
  throw new DBError("error on getting users by type")
 }
}

module.exports = {
 getOneById,
 getUsersByType,
}
