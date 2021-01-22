require("dotenv").config()
const {
 ENVIRONMENT: { port },
} = require("./config/constants")
const express = require("express")
const bodyParser = require("body-parser")
const librariansRouts = require("./config/routes/librarians-routes")
const usersRoutes = require("./config/routes/users-routes")
const { errorHandler } = require("./config/middlewares/error-handler")

const jsonParser = bodyParser.json()

const app = express()
app.use(jsonParser)
app.use("/api/v1/librarians", librariansRouts)
app.use("/api/v1/users", usersRoutes)
app.use(errorHandler)
app.listen(port)
