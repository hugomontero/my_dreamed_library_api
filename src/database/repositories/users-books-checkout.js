const knex = require("../databaseConfig")
const tableName = "users_books_checkout"
const { DBError } = require("../../config/errors/errorModel")

const getOneById = async (id) => {
 try {
  return await knex(tableName).where({ id: id }).first()
 } catch (error) {
  console.log(error)
  throw new DBError("Error getting user books checkout")
 }
}

const getOneByUserIdAndBook = async (user_id, book_id, checkout_status) => {
 try {
  return await knex(tableName).where({ user_id, book_id, checkout_status }).first()
 } catch (error) {
  console.log(error)
  throw new DBError("Error on getting user books relation")
 }
}

const getListByUserIdAndStatus = async (user_id, checkout_status) => {
 try {
  return await knex(tableName).where({ user_id, checkout_status }).whereNull("deleted_at")
 } catch (error) {
  console.log(error)
  throw new DBError("Error on getting a list of books checkedout by user_id")
 }
}

const getListByBookIdAndStatus = async (book_id, checkout_status) => {
 try {
  return await knex(tableName).where({ book_id, checkout_status })
 } catch (error) {
  console.log(error)
  throw new DBError("Error on getting a list of users that checkout the same book")
 }
}

const deleteUserBookLinkById = async (id) => {
 try {
  return await knex(tableName).where({ id }).update({ deleted_at: new Date() })
 } catch (error) {
  console.log(error)
  throw new DBError("Error on soft deleting the link between book and user by id")
 }
}

const insert = async ({ user_id, book_id, return_date, checkout_status = "checkout" }) => {
 try {
  return await knex(tableName).insert({ user_id, book_id, return_date, checkout_status })
 } catch (error) {
  console.log(error)
  throw new DBError("error on inserting user books relation")
 }
}

const updateBookRelation = async ({ id, checkout_status, return_date }) => {
 try {
  return await knex(tableName).where({ id }).update({ checkout_status, return_date })
 } catch (error) {
  console.log(error)
  throw new DBError("error on updating user books relation")
 }
}

const getRelationsByStatusAndDate = async ({ checkout_status, return_date }) => {
 try {
  return await knex(tableName)
   .select()
   .where("return_date", "<", return_date)
   .where({ checkout_status })
 } catch (error) {
  console.log(error)
  throw new Error("Error on getting overdue books")
 }
}

module.exports = {
 getOneById,
 getOneByUserIdAndBook,
 getListByUserIdAndStatus,
 deleteUserBookLinkById,
 getListByBookIdAndStatus,
 insert,
 updateBookRelation,
 getRelationsByStatusAndDate,
}
