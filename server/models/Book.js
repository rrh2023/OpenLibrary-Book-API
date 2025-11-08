const mongoose = require('mongoose')

const BookSchema = new mongoose.Schema({
   title: {type: String, required: [true, 'Please add a title']},
    key:{
        type: String,
        required: [true, 'Please include OLID'],
        unique: true
    },
    author:{
        type: mongoose.Schema.ObjectId,
        ref: 'Author',
        required: true
    },
    user:{
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    }
})

module.exports = mongoose.model('Book', BookSchema)