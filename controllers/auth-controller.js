// In an Express.js application, a controller refers to a part of your code that is responsible for handling the application's logic. Controllers are typically used to process incoming requests, interact with models (data sources), and send responses back to clients. They help organize your application by separating concerns and following the MVC (Model-View-Controller) design pattern.

const home = async (req, res) => {
    try {
         res.status(200).send("Hello!!")
    } catch (error) {
        console.log(error)
    }
}

const register = async (req, res) => {
    try {
        res.status(200).send("Welcome to registeration page using controllers!!")
    } catch (error) {
        res.status(400).send({msg:'Page not found'})
    }
}

module.exports = { home, register }