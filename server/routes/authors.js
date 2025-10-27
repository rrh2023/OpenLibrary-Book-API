const express = require('express')
const { getAuthors, getAuthor, createAuthor, deleteAuthor } = require('../controllers/authors')

const router = express.Router();

router.route('/').get(getAuthors).post(createAuthor)

router.route('/:id').get(getAuthor).delete(deleteAuthor)

module.exports = router



