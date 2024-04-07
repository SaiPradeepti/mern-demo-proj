const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

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

// json web token
userSchema.methods.generateToken = async function(){
    try {
        return jwt.sign({
            userId: this._id.toString(),
            email: this.email,
            isAdmin: this.isAdmin
        },
        process.env.JWT_SECRET_KEY,
        {
            expiresIn: "30d"
        }
        )
    } catch (error) {
        console.log(error)
    }
}


// define model or the collection name

const User = new mongoose.model("User", userSchema)

module.exports = User;

// ************************************************************************

// JWT - Json web token is an open standard that defines a compact and 
// self contained way of securely transmitting information between parties as a JSON Object

// JWTs are often used for authentication and authorization in web applications.
// 1. Authentication: Verifying the identity of a user or client 
// 2. Authorization: Determining what actions a user or client is allowed to perform

// Components of JWT
//JSON Web Tokens consist of three parts separated by dots (.) - Header, Payload and Signature
//Header - Contains metadata about the token, such as type of token and the signing algorithm being used
//Payload - Contains claims or statements about an entity (typically, the user) and additional data.
//Common cliams include user ID, username and expiration time.
// Signature: To verify that the sender of the JWT is who it says it is and to ensure
//that the message wasnt changed along way, a signature is included

// ---
//header typically consists of two parts: the type of the token, which is JWT, and the signing algorithm being used, such as HMAC SHA256 or RSA. 
// example : {
//   "alg": "HS256",
//   "typ": "JWT"
// }

// The second part of the token is the payload, which contains the claims. Claims are statements about an entity (typically, the user) and additional data. There are three types of claims: registered, public, and private claims.

// example payload
// {
//   "sub": "1234567890",
//   "name": "John Doe",
//   "admin": true
// }

//Signature
// To create the signature part you have to take the encoded header, the encoded payload, a secret, the algorithm specified in the header, and sign that.

// tokens, such as JWTs are typically not stored in the database along with other user details. Instead, they are issued by the server during the authentication process and then stored on the client-side (eg, in cookies or local storage) for later use.