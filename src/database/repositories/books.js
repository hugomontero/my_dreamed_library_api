const knex = require("../databaseConfig")
const tableName = "books"
const { DBError } = require("../../config/errors/errorModel")

const getOneById = async (id) => {
 try {
  return knex(tableName).where("id", id).whereNull("deleted_at").first()
 } catch (error) {
  console.error(error)
  throw new DBError("get_element_by_id")
 }
}

const insert = async ({ title, ISBN, author, publisher, copies, cover_image }) => {
 try {
  return await knex(tableName).insert({ title, ISBN, author, publisher, copies, cover_image })
 } catch (error) {
  console.error(error)
  throw new DBError("insert_element")
 }
}

const update = async ({ id, title, author, publisher, copies, cover_image }) => {
 try {
  return await knex(tableName)
   .where({ id })
   .update({ title, author, publisher, copies, cover_image })
 } catch (error) {
  console.log(error)
  throw new DBError("Error on updating book")
 }
}

const getOneByISBN = async (ISBN) => {
 try {
  return await knex(tableName).where({ ISBN: ISBN }).whereNull("deleted_at").first()
 } catch (error) {
  console.log(error)
  throw new DBError("getOneByISBN")
 }
}

const insertMany = async (quotes) => {
 try {
  return knex(tableName).insert(quotes)
 } catch (error) {
  console.error(error)
  throw new DBError("insert_many_elements")
 }
}

const getCount = async () => {
 try {
  return await knex(tableName).count("id", { as: "total" }).first()
 } catch (error) {
  console.error(error)
  throw new DBError("get_count")
 }
}

const deleteById = async (id) => {
 try {
  let book = await knex(tableName).where({ id: id }).first()
  if (!book) {
   return true
  }
  await knex(tableName)
   .where("id", id)
   .update({ deleted_at: new Date(), ISBN: `${book.ISBN}-${new Date().toISOString()}` })
  return true
 } catch (error) {
  console.error(error)
  throw new DBError("Error on logical deletion")
 }
}

module.exports = {
 getOneById,
 getOneByISBN,
 insert,
 update,
 insertMany,
 getCount,
 deleteById,
}
