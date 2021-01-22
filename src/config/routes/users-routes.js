const router = require("express").Router()
const { getCheckedOutBooks, checkoutBook, returnBook } = require("../../services/user-books")
const { STATUS_CODE } = require("../constants")
const { InvalidParametersError } = require("../errors/errorModel")

router.get("/:id/checkout-books", async (req, res, next) => {
 try {
  let user_id = req.params["id"]
  if (!user_id) throw new InvalidParametersError(`The user id is required`)

  const checkoudBooks = await getCheckedOutBooks(user_id)
  res.status(STATUS_CODE.SUCESS).send(checkoudBooks)
 } catch (error) {
  next(error)
 }
})

router.post("/:id/checkout-books", async (req, res, next) => {
 try {
  let user_id = req.params["id"]
  if (!user_id) throw new InvalidParametersError(`The user id is required`)
  let { ISBN } = req.body
  if (!ISBN) throw new InvalidParametersError(`The book ISBN is required`)
  const bookCheckedOut = await checkoutBook(user_id, ISBN)
  res.status(STATUS_CODE.CREATED).send(bookCheckedOut)
 } catch (error) {
  next(error)
 }
})

router.delete("/:id/checkout-books/:isbn", async (req, res, next) => {
 try {
  let user_id = req.params["id"]
  let ISBN = req.params["isbn"]
  if (!user_id) throw new InvalidParametersError(`the user id is required`)
  if (!ISBN) throw new InvalidParametersError(`The ISBN is required`)
  await returnBook(ISBN, user_id)
  res.sendStatus(STATUS_CODE.SUCESS)
 } catch (error) {
  next(error)
 }
})
module.exports = router
