import express from 'express';
import dotenv from 'dotenv';
dotenv.config()

const app = express();
const port = process.env.PORT;
app.get('/', (req, res) => {
    res.send('Hi!');
});
app.listen(port, () => {
    return console.log(`Server started on port: ${port}`);
});