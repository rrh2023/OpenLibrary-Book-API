const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async')
const Book = require('../models/Book')

// @desc   Get all Books
// @route  GET /api/v1/books
// @access Public

exports.getBooks = asyncHandler(async (req, res, next) => {
    let query;

    if(req.params.booksId){
        query = Book.find({book: req.params.bookId})
    }else{
        query = Book.find()
    }

    const books = await query;

    res.status(200).json({
        success: true, 
        data: books
    }
        
    )
})