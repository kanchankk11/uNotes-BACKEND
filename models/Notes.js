const mongoose = require('mongoose')
const { Schema } = mongoose;

const NotesSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    title: {
        type: String,
        default: "Untitled"
    },
    textBody: {
        type: String,
        default: ""
    },
    date: { type: Date, default: Date.now },
    hidden: Boolean

});

module.exports = mongoose.model('notes', NotesSchema)