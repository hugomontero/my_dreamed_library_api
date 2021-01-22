const { getUsersByType } = require("../database/repositories/users")
const USER_TYPES = {
 LIBRARIAN: 0,
 CUSTOMER: 1,
}
const getAllLibrarians = async () => {
 return getUsersByType(USER_TYPES.LIBRARIAN)
}

const getAllCustomers = async () => {
 return getUsersByType(USER_TYPES.CUSTOMER)
}

module.exports = {
 getAllLibrarians,
 getAllCustomers,
}
