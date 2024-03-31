// In an Express.js application, a controller refers to a part of your code that is responsible for handling the application's logic. Controllers are typically used to process incoming requests, interact with models (data sources), and send responses back to clients. They help organize your application by separating concerns and following the MVC (Model-View-Controller) design pattern.

const User = require('../models/user-model')

const home = async (req, res) => {
    try {
         res.status(200).send("Hello!!")
    } catch (error) {
        console.log(error)
    }
}

const register = async (req, res) => {
    try {
        const {username, email, phone, password} = req.body;

        // const userExist = User.findOne({email: email})
        const userExist = await User.findOne({email})

        if(userExist){
            return res.status(400).json({message: "Email already exists"})
        }

        const userCreated = await User.create({username, email, phone, password})

        // console.log(data)
        res.status(200).json({message: userCreated})
    } catch (error) {
        res.status(500).json("internal server error")
    }
}

module.exports = { home, register }