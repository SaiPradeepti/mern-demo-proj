const mongoose = require('mongoose')

const URI = 'mongodb+srv://cluster0.fuvo3lh.mongodb.net/mern_admin'
// mongoose.connect(URI);

const connectDB = async () => {
    try {
        await mongoose.connect(URI)
        console.log('databse connect successful')        
    } catch (error) {
        console.error('databse connect failed')
        process.exit(0)
    }
}

module.exports = connectDB;