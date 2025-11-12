const express = require('express')
const { getAuthors, getAuthor, createAuthor, deleteAuthor } = require('../controllers/authors')

const Author = require('../models/Author')

// Include other resource routers
const bookRouter = require('./books')

const router = express.Router({ mergeParams: true});

const advancedResults = require('../middleware/advancedResults')
const { protect, authorize } = require('../middleware/auth')

// Re-route into other resource routers
router.use('/:authorId/books', bookRouter)

router.route('/').get(advancedResults(Author, 'books'), getAuthors).post(protect, authorize('publisher', 'admin'), createAuthor)

router.route('/:id').get(getAuthor).delete(protect, authorize('publisher', 'admin'), deleteAuthor)

module.exports = router



