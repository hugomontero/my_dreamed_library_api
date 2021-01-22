/* eslint-disable no-unused-vars */
const errorHandler = (err, req, res, next) => {
 if (!err.statusCode) err.statusCode = 500
 res.status(err.statusCode).send(err.message)
}

module.exports = {
 errorHandler,
}
