// In an Express.js application, a controller refers to a part of your code that is responsible for handling the application's logic. Controllers are typically used to process incoming requests, interact with models (data sources), and send responses back to clients. They help organize your application by separating concerns and following the MVC (Model-View-Controller) design pattern.

const User = require('../models/user-model')
const bcrypt = require('bcrypt')

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

        // hash the password
        // greater the saltRound the more complex the hasing of passwrod is and at the same time more time consuming
        // const saltRounds = 10 
        // const hash_password = await bcrypt.hash(password, saltRounds)

        const userCreated = await User.create({username, email, phone, password})

        // console.log(data)
        res.status(201).json({msg: "registration successful", token: await userCreated.generateToken(), userId: userCreated._id.toString()})
    } catch (error) {
        res.status(500).json(`internal server error: ${error}`)
    }
}

module.exports = { home, register }

// _id needs to be converted to string as _id holds an ObjectId 
// The field name _id is reserved for use as a primary key