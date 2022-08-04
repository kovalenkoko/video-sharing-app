export {}
require("dotenv").config()
const express = require("express")
const sequelize = require("./db")
const models = require("./src/models/models")
const router = require("./src/routes/index")
const errorHandler = require("./src/middleware/ErrorHandlingMiddleware")
const fileUpload = require("express-fileupload")
const path = require("path")
const cookieParser = require("cookie-parser")
const log4js = require("log4js");
const swaggerUi = require("swagger-ui-express")
const swaggerDocument = require("./src/swagger/openapi.json")


log4js.configure({
    appenders: { users: { type: "file", filename: "users.log" },gallery: { type: "file", filename: "gallery.log" }, video:{ type: "file", filename: "video.log" } },
    categories: { default: { appenders: ["users"], level: "error" }, gallery: { appenders: ["gallery"], level: "error" }, video:{appenders: ["video"], level: "error"}},
});


const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(express.static(path.resolve(__dirname, "static")))
app.use(fileUpload({}))
app.use("/api", router)
app.use(errorHandler)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT || 5050

const start = async () =>{
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () =>  console.log(`Server started on port: ${PORT}`))
    }catch (err){
        console.log(err)
    }
}
start()