const express = require('express')
const { getBooks } = require('../controllers/books')

const router = express.Router();

router.route('/').get(getBooks)

module.exports = router