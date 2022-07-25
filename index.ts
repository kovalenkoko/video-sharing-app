export {}
const express = require("express");
const sequelize = require("./db");
const models = require("./src/models/models");
const router = require("./src/routes/index")
const errorHandler = require("./src/middleware/ErrorHandlingMiddleware")


require("dotenv").config()

const app = express();
app.use(express.json());
app.use("/api", router);

app.use(errorHandler)

const PORT = process.env.PORT || 5050;

const start = async () =>{
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, () =>  console.log(`Server started on port: ${PORT}`));
    }catch (err){
        console.log(err)
    }
}
start()