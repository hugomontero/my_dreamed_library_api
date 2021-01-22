module.exports = {
 ENVIRONMENT: {
  port: process.env.PORT || 3000,
  database: {
   testing: {
    test_host: process.env.TEST_HOST,
    test_database: process.env.TEST_DATABASE,
    test_user: process.env.TEST_USER,
    test_password: process.env.TEST_PASSWORD,
   },
   operative: {
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
   },
  },
 },
 CHECKOUT_STATUS: {
  CHECKOUT: "checkout",
  RETURNED: "returned",
 },
 STATUS_CODE: {
  SUCESS: 200,
  CREATED: 201,
 },
}
