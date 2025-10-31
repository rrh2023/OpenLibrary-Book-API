const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async')
const Book = require('../models/Book')
const Author = require('../models/Author')

// @desc   Get all books
// @route  GET /api/v1/books
// @route  GET /api/v1/authors/:authorsId/books
// @access Public

exports.getBooks = asyncHandler(async (req, res, next) => {
    let query;

    if(req.params.authorsId){
        const books = await Book.find({book: req.params.authorId});

        return res.status(200).json({
            success: true,
            count: books.length,
            data: courses
        })
    }else{
        res.status(200).json(res.advancedResults)
    }

    
})

// @desc   Get single book
// @route  GET /api/v1/books/:id
// @access Public

exports.getBook = asyncHandler(async (req, res, next) => {

    const book = await Course.findById(req.params.id).populate({
        path: 'author',
        select: 'name description'
    })

    if(!course){
        return next(new ErrorResponse(`No course with the id of ${req.params.id}`), 404)
    }

    res.status(200).json({
        success: true, 
        data: book
    })
})

// @desc   Add book
// @route  POST /api/v1/authors/:authorId/books
// @access Private

exports.addBook = asyncHandler(async (req, res, next) => {

    req.body.author = req.params.authorId;

    const author = await Author.findById(req.params.id)

    if(!author){
        return next(new ErrorResponse(`No author with the id of ${req.params.authorId}`), 404)
    }

    const book = await Book.create(req.body);

    res.status(200).json({
        success: true, 
        data: book
    })
})

// @desc   Delete book
// @route  DELETE /api/v1/books/:id
// @access Private

exports.deleteBook = asyncHandler(async (req, res, next) => {
    const book = await Book.findById(req.params.id);

    if(!book){
        return next(
            newErrorResponse(`No book with the ida of ${req.params.id}`),
            404
        )
    }

    await book.remove()

    res.status(200).json({
        success: true,
        data: {}
    })
})