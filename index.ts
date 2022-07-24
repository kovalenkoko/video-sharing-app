const express = require("express");
const sequelize = require("./db");
const models = require("./src/models/models")

require("dotenv").config()

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5050;

app.get("/", (req, res) => {
    res.status(200).json({message: "Server configured"})
})

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