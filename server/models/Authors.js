const mongoose = require('mongoose')
const slugify = require ('slugify')

const AuthorSchema = new mongoose.Schema({
     personal_name: {
        type: String,
        trim: true,
        require: [true, 'Please add a course title']
    },
    key:{
            type: String,
            required: [true, 'Please include OLID'],
            unique: true
        },
    slug: String,
})

// Create author slug from the name 
AuthorSchema.pre('save', function(next){
    this.slug = slugify(this.title, {lower: true})
    next()
})

module.exports = mongoose.model('Author', AuthorSchema)