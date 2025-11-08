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
    user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
}
},
{
    toJSON: {virtuals: true},
    toObject: { virtuals: true }
})

// Create author slug from the name 
AuthorSchema.pre('save', function(next){
    this.slug = slugify(this.title, {lower: true})
    next()
});

//Cascade delete books when an author is deleted
AuthorSchema.pre('remove', async function (next){
    console.log(`Books being removed from author ${this._id}`)
    await this.model('Book').deleteMany({ author: this._id});
    next()
})

// Reverse populate with virtuals 
AuthorSchema.virtual('books', {
    ref: 'Book',
    localField: '_id',
    foreignField: 'author',
    justOne: false
})

module.exports = mongoose.model('Author', AuthorSchema)