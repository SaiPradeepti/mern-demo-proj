const express = require('express')
const app = express();
const router = require("../router/auth-router");
const connectDb = require("../utils/db")

// ** MIDDLEWARE 
app.use(express.json())

app.use("/api/auth", router);

// app.get('/',(req, res) => {
//     res.status(200).send("Welcome")
// })

// app.get('/register',(req, res) => {
//     res.status(200).send("Welcome to registeration page")
// })

connectDb().then(() => {
const PORT = 5000
app.listen(PORT,()=>{
    console.log(`server is listening at port: ${PORT}`)
})
})
