const {
 insert: userBookCheckout,
 getListByUserIdAndStatus,
 getListByBookIdAndStatus,
 getOneByUserIdAndBook,
 updateBookRelation,
 getRelationsByStatusAndDate,
} = require("../database/repositories/users-books-checkout")
const { getOneByISBN: getBookByISBN } = require("../database/repositories/books")
const {
 NotAllowedToCheckoutError,
 BookNotFoundError,
 UserBookRelationNotFoundError,
} = require("../config/errors/errorModel")
const { CHECKOUT_STATUS } = require("../config/constants")
const MAX_LIMIT_CHECKOUT_BOOKS = 3
const RETURN_DAYS = 15

const alreadyCheckedOut = (listOfCurrentCheckedOutBooks, book_id) => {
 let alreadyCheckedOutBook = listOfCurrentCheckedOutBooks.filter((book) => book.book_id === book_id)
 return alreadyCheckedOutBook.length
}

const validateMaxCheckoutLimit = (checkoutBooks, limit) => {
 return checkoutBooks.length < limit
}

const validateOverDueCheckoutBooks = (checkoutBooks) => {
 let overDueBooks = checkoutBooks.filter(
  (book) => book.return_date.getTime() < new Date().getTime()
 )
 return Boolean(overDueBooks.length)
}

const validateBookExistence = (bookRequested, checkoutBooksOtherUsers) => {
 return bookRequested.copies <= checkoutBooksOtherUsers.length
}

const canCheckout = (bookRequested, checkoutUserBooks, checkoutBookByOtherUsers, book_id) => {
 const isMaxLimit = !validateMaxCheckoutLimit(checkoutUserBooks, MAX_LIMIT_CHECKOUT_BOOKS)
 const isOverdue = validateOverDueCheckoutBooks(checkoutUserBooks)
 const areNoMoreCopies = validateBookExistence(bookRequested, checkoutBookByOtherUsers)
 const wasAlreadyCheckedOut = alreadyCheckedOut(checkoutUserBooks, book_id)
 if (isMaxLimit || isOverdue || areNoMoreCopies || wasAlreadyCheckedOut) return false
 return true
}

const checkoutBook = async (user_id, ISBN) => {
 const listOfCurrentCheckedOutBooks = await getListByUserIdAndStatus(
  user_id,
  CHECKOUT_STATUS.CHECKOUT
 )
 const bookToCheck = await getBookByISBN(ISBN)
 if (!bookToCheck) throw new BookNotFoundError(`The id ${ISBN} was not found`)

 const book_id = bookToCheck.id
 const listOfCurrentCheckedOutBooksByBook = await getListByBookIdAndStatus(
  book_id,
  CHECKOUT_STATUS.CHECKOUT
 )
 if (
  !canCheckout(
   bookToCheck,
   listOfCurrentCheckedOutBooks,
   listOfCurrentCheckedOutBooksByBook,
   book_id
  )
 )
  throw new NotAllowedToCheckoutError(`The user is not allowed to checkout this book`)
 const return_date = new Date()
 return_date.setDate(return_date.getDate() + RETURN_DAYS)
 const checkoutResponse = await userBookCheckout({
  user_id,
  book_id,
  return_date,
  checkout_status: CHECKOUT_STATUS.CHECKOUT,
 })
 return { id: checkoutResponse[0], user_id, book_id }
}

const returnBook = async (ISBN, user_id) => {
 let book = await getBookByISBN(ISBN)
 if (!book) throw new BookNotFoundError(`The book ${ISBN} was not found`)
 let userBookCheckout = await getOneByUserIdAndBook(user_id, book.id, CHECKOUT_STATUS.CHECKOUT)

 if (!userBookCheckout)
  throw new UserBookRelationNotFoundError(
   `The relation between ${ISBN} and ${user_id} was not found`
  )

 userBookCheckout.checkout_status = CHECKOUT_STATUS.RETURNED
 await updateBookRelation(userBookCheckout)

 return userBookCheckout
}

const getCheckedOutBooks = async (user_id) => {
 return getListByUserIdAndStatus(user_id, CHECKOUT_STATUS.CHECKOUT)
}

const getOverDueBooks = async () => {
 return getRelationsByStatusAndDate({
  return_date: new Date(),
  checkout_status: CHECKOUT_STATUS.CHECKOUT,
 })
}

module.exports = {
 checkoutBook,
 returnBook,
 getCheckedOutBooks,
 getOverDueBooks,
}
