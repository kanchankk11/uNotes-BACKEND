const mongoose = require('mongoose')
const { Schema } = mongoose;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true, unique: true
    },
    email: {
        type: String,
        required: true, unique: true
    },
    phone: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    noOfNotes : {
        type : Number,
        default : 0
    }

});

module.exports = mongoose.model('user', UserSchema)