const mongoose = require('mongoose')

const BookSchema = new mongoose.Schema({
    title: {type: String, required: [true, 'Please add a title']},
    slug: String,
    description: {type: String, required: [true, 'Please add description']},
    key:{
        type: String,
        required: [true, 'Please include OLID'],
        unique: true
    },
    pubish_date: String,
    subjects: [String]
})

module.exports = mongoose.model('Book', BookSchema)