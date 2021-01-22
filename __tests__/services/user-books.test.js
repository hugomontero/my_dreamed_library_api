const { checkoutBook, returnBook } = require("../../src/services/user-books")
const { insert: userBookCheckout, getListByUserIdAndStatus,
    getListByBookIdAndStatus, getOneByUserIdAndBook,
     updateBookRelation, getRelationsByStatusAndDate } = require("../../src/database/repositories/users-books-checkout")
 const { getOneById: getBookById, getOneByISBN: getBookByISBN } = require("../../src/database/repositories/books")
 const { NotAllowedToCheckoutError, BookNotFoundError , UserBookRelationNotFoundError} = require("../../src/config/errors/errorModel")

beforeEach(()=>{
    jest.resetAllMocks()
})

jest.mock("../../src/database/repositories/users-books-checkout")
jest.mock("../../src/database/repositories/books")

describe("testing the function checkout a book for some user", ()=>{
    it("should returns a checkout object with the relateds ids",async ()=>{
        getListByUserIdAndStatus.mockResolvedValueOnce([])
        getBookByISBN.mockResolvedValueOnce({
            title: "my title",
            publisher: "Publisher",
            ISBN:"ISBNXXXX",
            author: "author" ,
            copies:1,
            id: 1
        })
        getListByBookIdAndStatus.mockResolvedValueOnce([])
        userBookCheckout.mockResolvedValueOnce([1])
        const result = await checkoutBook(2, "ISBNXXXX")
        expect(result).toEqual({id: 1, user_id: 2, book_id: 1})
    })

    it("should throws an error when the user has more than 3 checkedout books", async()=>{
        getListByUserIdAndStatus.mockResolvedValueOnce([
            {user_id: 2, book_id: 1, return_date: new Date('2021-02-01'),checkout_status: "checkout"},
            {user_id:2, book_id:2, return_date: new Date('2021-02-01'),checkout_status: "checkout"},
            {user_id:2, book_id: 3, return_date: new Date('2021-02-01'),checkout_status: "checkout"}])
        getBookByISBN.mockResolvedValueOnce({
            title: "my title",
            publisher: "Publisher",
            ISBN:"ISBNXXXX",
            author: "author" ,
            copies:1,
            id: 4
        })
        getListByBookIdAndStatus.mockResolvedValueOnce([])
         
        expect(checkoutBook(2, "ISBNXXXX")).rejects.toThrow(NotAllowedToCheckoutError)
    })

    it("should throws an error when the user has an overdue book related", async()=>{
        getListByUserIdAndStatus.mockResolvedValueOnce([
            {user_id: 2, book_id: 1, return_date: new Date('2021-01-01')}
        ])            
        getBookByISBN.mockResolvedValueOnce({
            title: "my title",
            publisher: "Publisher",
            ISBN:"ISBNXXXX",
            author: "author" ,
            copies:1,
            id: 4
        })
        getListByBookIdAndStatus.mockResolvedValueOnce([])         
        expect(checkoutBook(2, "ISBNXXXX")).rejects.toThrow(NotAllowedToCheckoutError)
    })
    it("should throws an error when the user try to checkout the same book", async()=>{
        getListByUserIdAndStatus.mockResolvedValueOnce([
            {user_id: 2, book_id: 1, return_date: new Date('2021-02-01'), checkout_status: "checkout"}
        ])            
        getBookByISBN.mockResolvedValueOnce({
            title: "my title",
            publisher: "Publisher",
            ISBN:"ISBNXXXX",
            author: "author" ,
            copies:1,
            id: 1
        })
        getListByBookIdAndStatus.mockResolvedValueOnce([])         
        expect(checkoutBook(2, "ISBNXXXX")).rejects.toThrow(NotAllowedToCheckoutError)
    })
    it("should throws an error when the user try to checkout a book with no more copies", async()=>{
        getListByUserIdAndStatus.mockResolvedValueOnce([])            
        getBookByISBN.mockResolvedValueOnce({
            title: "my title",
            publisher: "Publisher",
            ISBN:"ISBNXXXX",
            author: "author" ,
            copies:1,
            id: 1
        })
        getListByBookIdAndStatus.mockResolvedValueOnce([{user_id: 3, book_id: 1, return_date: new Date("2021-02-01"), checkout_status: "checkout"}])         
        expect(checkoutBook(2, "ISBNXXXX")).rejects.toThrow(NotAllowedToCheckoutError)
    })
})


describe("testing the return function for a book", ()=>{
    it("should return a returned book when the user and the book are related", async ()=>{
        getBookByISBN.mockResolvedValueOnce({
            title: "my title",
            publisher: "Publisher",
            ISBN:"ISBNXXXX",
            author: "author" ,
            copies:1,
            id: 1
        })
        getOneByUserIdAndBook.mockResolvedValueOnce({
            user_id: 2,
            book_id: 1,
            checkout_status: "checkout",
            return_date: new Date("2021-02-01")
        })
        updateBookRelation.mockResolvedValueOnce([1])
        const result = await returnBook("ISBNXXXX", 2)
        expect(result).toEqual({
            user_id: 2,
            book_id: 1,
            checkout_status: "returned",
            return_date: new Date("2021-02-01")
        })
    })

    it("should throws an error when the user try to return an unexistent book", ()=>{
        getBookByISBN.mockResolvedValueOnce(undefined)
        expect(returnBook("ISBNXXXX", 2)).rejects.toThrow(BookNotFoundError)
    })
    it("should throws an error when the user try to return an unlinked book", ()=>{
        getBookByISBN.mockResolvedValueOnce({
            title: "my title",
            publisher: "Publisher",
            ISBN:"ISBNXXXX",
            author: "author" ,
            copies:1,
            id: 1
        })
        getOneByUserIdAndBook.mockResolvedValueOnce(undefined)
        expect(returnBook("ISBNXXXX", 2)).rejects.toThrow(UserBookRelationNotFoundError)

    })
})