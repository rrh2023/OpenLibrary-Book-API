const express = require('express')
const { getBooks, getBook, addBook, deleteBook } = require('../controllers/books')

const router = express.Router({ mergeParams: true});

router.route('/').get(getBooks).post(addBook);

router.route('/:id').get(getBook).delete(deleteBook)

module.exports = router