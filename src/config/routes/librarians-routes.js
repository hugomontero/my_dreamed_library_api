const router = require("express").Router()
const { createBook, removeBook } = require("../../services/books")
const { getOverDueBooks } = require("../../services/user-books")
const { STATUS_CODE } = require("../constants")
const { NotAllowdError, InvalidParametersError } = require("../errors/errorModel")

router.post("/:id/books/", async (req, res, next) => {
 try {
  let id = req.params["id"]
  if (parseInt(id) !== 1)
   throw new NotAllowdError(`The user ${id} is not allowed to perform this transaction`)
  let { title, author, publisher, copies, cover_image, ISBN } = req.body
  if (!ISBN) throw new InvalidParametersError("The ISBN is required for the book creation")
  let bookCreated = await createBook({ title, author, publisher, copies, cover_image, ISBN })
  res.status(STATUS_CODE.CREATED).send(bookCreated)
 } catch (error) {
  next(error)
 }
})

router.delete("/:id/books/:book_id", async (req, res, next) => {
 try {
  let id = req.params["id"]
  let book_id = req.params["book_id"]
  if (parseInt(id) !== 1)
   throw new NotAllowdError(`The user ${id} is not allowed to perform this transaction`)
  if (!book_id) throw new InvalidParametersError("The bookId is required for the book removal")
  await removeBook(book_id)
  res.sendStatus(STATUS_CODE.SUCESS)
 } catch (error) {
  next(error)
 }
})

router.get("/:id/books-overdued/", async (req, res, next) => {
 try {
  let id = req.params["id"]
  if (parseInt(id) !== 1)
   throw new NotAllowdError(`The user ${id} is not allowed to perform this transaction`)
  let overduedBooks = await getOverDueBooks()
  res.status(STATUS_CODE.SUCESS).send(overduedBooks)
 } catch (error) {
  next(error)
 }
})
module.exports = router
