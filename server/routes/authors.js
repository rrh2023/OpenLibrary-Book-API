const express = require('express')
const { getAuthors, getAuthor, createAuthor, deleteAuthor } = require('../controllers/authors')


const Author = require('../models/Author')
const advancedResults = require('../middleware/advancedResults')

// Include other resource routers
const bookRouter = require('./books')

const router = express.Router({ mergeParams: true});

// Re-route into other resource routers
router.use('/:authorId/books', bookRouter)

router.route('/').get(advancedResults(Author, 'courses'), getAuthors).post(createAuthor)

router.route('/:id').get(getAuthor).delete(deleteAuthor)

module.exports = router



