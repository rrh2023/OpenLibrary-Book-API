const express = require('express')
const { getBooks, getBook, addBook, deleteBook } = require('../controllers/books')

const Book = require('../models/Book')
const advancedResults = require('../middleware/advancedResults')

const router = express.Router({ mergeParams: true});

router.route('/').get(advancedResults(Book,{
    path: 'author',
    select: 'personal_name'
}), getBooks).post(addBook);

router.route('/:id').get(getBook).delete(deleteBook)

module.exports = router