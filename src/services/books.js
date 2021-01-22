const {
 insert: insertBook,
 getOneByISBN,
 update: updateBook,
 deleteById: deleteBookById,
} = require("../database/repositories/books")
const { getListByBookIdAndStatus } = require("../database/repositories/users-books-checkout")
const { CHECKOUT_STATUS } = require("../config/constants")
const { BookAlreadyInUseError } = require("../config/errors/errorModel")

const createBook = async ({ title, ISBN, author, publisher, copies, cover_image }) => {
 let book = await getOneByISBN(ISBN)
 if (book) {
  book.copies += 1
  await updateBook(book)
  return book
 } else {
  book = { title, ISBN, author, publisher, copies, cover_image }
  if (!copies) book.copies = 1
  const bookId = await insertBook(book)
  book.id = bookId[0]
 }
 return book
}

const removeBook = async (id) => {
 const currentLendedBooks = await getListByBookIdAndStatus(id, CHECKOUT_STATUS.CHECKOUT)
 if (currentLendedBooks.length)
  throw new BookAlreadyInUseError(`The book ${id} is already in use by other users`)
 return deleteBookById(id)
}
module.exports = {
 createBook,
 removeBook,
}
