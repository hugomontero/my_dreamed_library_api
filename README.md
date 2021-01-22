# my_dreamed_library_api
This project contains an api that allows to manage a simple library with the follow endpoints:

- Create a book
- Remove a book by Id
- Get a list of all overdue books
- Checkout a book from a user
- Return a book
- list all currently checked out books for a user

Following you'll find the API spec for each function described before.

```librarian:```
```
POST -- Create a book
/api/v1/librarians/:id/books
body: {
    "title": "MY BOOK",
    "ISBN": "MI0189811289312-919213",
    "author": "MY author",
    "publisher": "my publisher",
    "copies": 3
}
```
If you don't put the copy element, the system will create a book with 1 copy, if you repeat the same book, the system will increment the copy number for the existent book

```
DELETE -- Remove a book
/api/v1/librarians/:id/books/:book_id
```
In this case you only can remove a book that does not have currently checkout books for any user

```
GET -- Get a list of overdue books
/api/v1/librarians/:id/books-overdued
returns:
[{
    "id":1, 
    "user_id": 2,
    "book_id": 1,
    "return_date": "2021-01-01T13:23:00.000Z",
    "checkout_status": "checkout"
}]
```
```user```
```
POST -- Do a checkout
/api/v1/users/:id/checkout-books
body: {"ISBN": "XAS123AA12k1"}
```
If the user has the capacity of do a checkout the system will retreave a 201 status code, else will retrieve an error
```
GET -- Get currently checkout by user
/api/v1/users/:id/checkout-books
returns [{user_id: 1, book_id: 1, return_date: "2021-02-01T13:00:00.000Z", checkout_status: "checkout"}]
```
```
DELETE -- Returns a checked out book
/api/v1/users/:id/checkout-books/:ISBN
```
### How to Install
in order to install the system you must do the following commands
#### Install dependencies
- npm install

#### Run database migrations
- Configure your env file with the follow variables


```
NODE_ENV=development
ENV=development
DB_HOST=localhost
DB_DATABASE=mylibrary
DB_USER=my_user
DB_PASSWORD=password
```
- run ```node_modules/.bin/knex migrate:latest```

#### Run the server
- Configure your env file variables

```
## SERVICE ENVIRONMENTS
port=3000
```
- run ```npm start```

#### Business Rules
A User can check out any book except when:
- They currently have 3 checked-out books.
- They are overdue on returning any book.
* An endpoint to return a checked-out book to the library.
* An endpoint that lists all currently checked out books for that user.

#### Extra rules
A user only can check out a book that does not have in the moment
A user only can check out a book if there is available copies
A book only can be deleted if all copies are available (no copies checked out)

