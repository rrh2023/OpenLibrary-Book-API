const express = require('express')
const { getBooks, getBook, addBook, deleteBook } = require('../controllers/books')

const Book = require('../models/Book')
const advancedResults = require('../middleware/advancedResults')

const router = express.Router({ mergeParams: true});

const { protect, authorize } = require('../middleware/auth')

router.route('/').get(advancedResults(Book,{
    path: 'author',
    select: 'personal_name'
}), getBooks).post(protect, authorize('publisher', 'admin'), addBook);

router.route('/:id').get(getBook).delete(protect, authorize('publisher', 'admin'),  deleteBook)

module.exports = router