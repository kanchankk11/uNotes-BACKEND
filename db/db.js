require('dotenv').config()
const mongoose = require('mongoose');

//const url = "mongodb://127.0.0.1:27017/ecomm";

const connectDB = async () => {
    try {
        mongoose.set('strictQuery', false)
        const dbURL = process.env.DB_URL+process.env.DB_NAME;
        mongoose.connect(dbURL) 
        console.log('Mongo connected')
    } catch(error) {
        console.log(error)
        process.exit()
    }
}

module.exports = connectDB
