const express = require('express')
const { getBooks, getBook, createBook, deleteBook } = require('../controllers/books')

const router = express.Router();

router.route('/').get(getBooks).post(createBook)

router.route('/:id').get(getBook).delete(deleteBook)

module.exports = router