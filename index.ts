const express = require("express");
const sequelize = require("./db");

require("dotenv").config()

const app = express();
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