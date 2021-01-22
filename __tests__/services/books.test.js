
const { createBook, removeBook } = require("../../src/services/books")
const {  insert: insertBook, getOneByISBN, update: updateBook, deleteById: deleteBookById} = require("../../src/database/repositories/books")
const { getListByBookIdAndStatus } = require("../../src/database/repositories/users-books-checkout")
const { BookAlreadyInUseError } = require("../../src/config/errors/errorModel")
beforeEach(()=>{
    jest.resetAllMocks()
})

jest.mock("../../src/database/repositories/books")
jest.mock("../../src/database/repositories/users-books-checkout")

describe("testing books the creation of a new book", ()=>{
    it("it should return a new book when it's created without any problem", async()=>{
        insertBook.mockResolvedValueOnce([1])
        getOneByISBN.mockResolvedValueOnce(undefined)
        const insertData = {
            title: "my title",
            publisher: "Publisher",
            ISBN:"ISBNXXXX",
            author: "author",
            copies: 1
        }
        const result = await createBook(insertData)
        expect(result).toEqual({...insertData, id: 1})
    })

    it("should returns a new book and the copy equals to 1 when we don't settled this element", async()=>{
        insertBook.mockResolvedValueOnce([1])
        getOneByISBN.mockResolvedValueOnce(undefined)
        const insertData = {
            title: "my title",
            publisher: "Publisher",
            ISBN:"ISBNXXXX",
            author: "author"            
        }
        const result = await createBook(insertData)
        expect(result).toEqual({...insertData, id: 1, copies: 1})
    })

    it("should returns an existent book with a incremental copy when the ISBN already exists", async()=>{
        const mockedExistentBook = {
            title: "my title",
            publisher: "Publisher",
            ISBN:"ISBNXXXX",
            author: "author" ,
            copies:1,
            id: 1
        }
        updateBook.mockResolvedValueOnce([1])
        getOneByISBN.mockResolvedValueOnce(mockedExistentBook)
        const insertData = {
            title: "my title",
            publisher: "Publisher",
            ISBN:"ISBNXXXX",
            author: "author" ,
        }
        const result = await createBook(insertData)
        expect(result).toEqual({...mockedExistentBook, copies: 2})
    })
})

describe("testing books deletion for existent books", ()=>{
    it("should remove a book when this books is not already in use", async()=>{
        getListByBookIdAndStatus.mockResolvedValueOnce([])
        deleteBookById.mockResolvedValueOnce(true)
        const result = await removeBook(1)
        expect(result).toBe(true)
    })
    it("should thow an error when the book is in use by other user", async()=>{
        getListByBookIdAndStatus.mockResolvedValueOnce([{
            title: "my title",
            publisher: "Publisher",
            ISBN:"ISBNXXXX",
            author: "author" ,
            copies:1,
            id: 1
        }])
        expect(removeBook(1)).rejects.toThrow(BookAlreadyInUseError)
    })
})

