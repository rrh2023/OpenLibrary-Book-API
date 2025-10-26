const mongoose = require('mongoose')
const slugify = require ('slugify')

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

// Create book slug from the name 
BookSchema.pre('save', function(next){
    this.slug = slugify(this.title, {lower: true})
    next()
})

module.exports = mongoose.model('Book', BookSchema)