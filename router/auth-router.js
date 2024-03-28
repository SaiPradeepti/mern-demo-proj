// Express Router -> express.Router

// In Express.js, express.Router is a mini Express application without all the server configurations but with the ability to define routes, middleware, and even have its own set of route handlers. It allows you to modularize your routes and middleware to keep your code organized and maintainable.

// Use the express.Router class to create modular, mountable router handlers. A router instance is a complete middleware and routing sytem, for this reason, it is often referred to as a 'mini-app'.

// router.get('/', (req, res) => {
//     res.status(200).send("Welcome to registeration page! checking.....")
// })

// app.get('/register',(req, res) => {
//     res.status(200).send("Welcome to registeration page")
// })

const express = require("express");
const router = express.Router();

router.route('/').get((req,res) => {
    res.status(200).send("Hello!!")
})

router.route('/register').get((req,res) => {
    res.status(200).send("Welcome to registeration page!!")
})

module.exports = router;