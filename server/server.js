const express = require('express')
const app = express();

app.get('/',(req, res) => {
    res.status(200).send("Welcome")
})

app.get('/register',(req, res) => {
    res.status(200).send("Welcome to registeration page")
})

const PORT = 5000
app.listen(PORT,()=>{
    console.log(`sever is listening at port: ${PORT}`)
})