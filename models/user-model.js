const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    username : {
        type: String,
        require: true,
    },
    email : {
        type: String,
        require: true,
    }
    ,
    phone : {
        type: String,
        require: true,
    },
    password : {
        type: String,
        require: true,
    },
    isAdmin : {
        type: Boolean,
        default: false,
    }
})

// secure the password with the bcrypt
// the below code will run before the user is created in the database
userSchema.pre('save', async function(next) {
    const user = this;
    if(!user.isModified('password'))
        next()

    try {
        const saltRounds = await bcrypt.genSalt(10)
        const hash_password = await bcrypt.hash(user.password, saltRounds)
        user.password = hash_password;
    } catch (error) {
        next(error);
    }
})

// define model or the collection name

const User = new mongoose.model("User", userSchema)

module.exports = User;