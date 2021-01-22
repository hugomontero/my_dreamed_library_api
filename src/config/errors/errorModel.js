const STATUSCODE = {
 NOT_ALLOWED: 401,
 NOT_FOUND: 404,
 BAD_REQUEST: 400,
 SYSTEM_ERROR: 500,
}

class GenericError extends Error {
 constructor(name, message, statusCode, errorCode) {
  super(message)
  this.name = name
  this.statusCode = statusCode
  this.errorCode = errorCode || "E-01"
 }
}

class DBError extends GenericError {
 constructor(message) {
  super(`DBError`, message, STATUSCODE.SYSTEM_ERROR, "E-02")
 }
}

class NotAllowedToCheckoutError extends GenericError {
 constructor(message) {
  super(`NotAllowedToCheckoutError`, message, STATUSCODE.BAD_REQUEST, "E-03")
 }
}

class BookNotFoundError extends GenericError {
 constructor(message) {
  super(`BookNotFoundError`, message, STATUSCODE.NOT_FOUND, "E-04")
 }
}

class UserBookRelationNotFoundError extends GenericError {
 constructor(message) {
  super(`UserBookRelationNotFoundError`, message, STATUSCODE.NOT_FOUND, "E-05")
 }
}

class BookAlreadyInUseError extends GenericError {
 constructor(message) {
  super(`BookAlredyInUseError`, message, STATUSCODE.BAD_REQUEST, "E-06")
 }
}

class InvalidParametersError extends GenericError {
 constructor(message) {
  super(`InvalidParametersError`, message, STATUSCODE.BAD_REQUEST, "E-07")
 }
}

class NotAllowdError extends GenericError {
 constructor(message) {
  super(`NotAllowedError`, message, STATUSCODE.NOT_ALLOWED, "E-08")
 }
}

module.exports = {
 GenericError,
 DBError,
 NotAllowedToCheckoutError,
 BookNotFoundError,
 UserBookRelationNotFoundError,
 BookAlreadyInUseError,
 InvalidParametersError,
 NotAllowdError,
}
