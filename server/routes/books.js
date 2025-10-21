const express = require('express')
const { getBooks, getBook, createBook, deleteBook } = require('../controllers/books')

const router = express.Router();

router.route('/').get(getBooks).post(createBook)

module.exports = router