const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async')
const Book = require('../models/Book')

// @desc Get all books
// @route GET /api/v1/books
// @access Public
exports.getBooks = asyncHandler(async (req,res,next) => {
    let query;

    // Copy req.query
    const reqQuery = {...req.query}

    // Fiels to exclude 
    const removeFields = ['select', 'sort', 'page', 'limit']

    // Loop over removeFields and delete them from reqQuery
    removeFields.forEach(param => delete reqQuery[param])

    // Create query string
    let queryStr = JSON.stringify(req.query);

    // Create operators
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g,match => `${match}`)

    // Finding resource
    query = Book.find(JSON.parse(queryStr));

    // Select Fields
    if(req.query.select){
        const fields = req.query.select.split(',').join(' ');
        query = query.select(fields)
    }

    // Sort
    if(req.query.sort){
        const sortBy = req.query.sort.split(',').join(' ');
        query = query.sort(sortBy)
    }else {
        query = query.sort('-createdAt')
    }

    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 25;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await Bootcamp.countDocuments()

    query = query.skip(startIndex).limit(limit);

    // Executing query
    const books = await query

    // Pagination
    const pagination = {}

    if(endIndex < total){
        page: page + 1,
        limit
    }

    if(startIndex > 0){
        pagination.prev = {
            page: page -1,
            limit
        }
    }

    res.status(200).json({success: true, count:books.length, pagination: pagination, data: books})

})

// @descs Get single book
// @route GET /api/v1/book/:id
// @access Public
exports.getBook = asyncHandler(async (req, res, next) => {
        const book = await Book.findById(req.params.id);

        if(!book){
            return next(new ErrorResponse(`Book not found with id of ${req.params.id}`, 404));
        }else{
            res.status(200).json({success: true, data: book})
        }
})

// @desc Create new book
// @route POST /api/v1/book
// @access Private
exports.createBook = asyncHandler(async (req, res, next) => {
        const book = await Book.create(req.body)
        res.status(201).json({success: true, data: book})
})

// @desc  Delete book
// @route DELETE /api/v1/book/:id
// @access Private
exports.deleteBook = asyncHandler(async (req, res, next) => {

        const book = await Book.findByIdAndDelete(req.params.id);

        if(!book){
            return next(new ErrorResponse(`Book not found with id of ${req.params.id}`, 404));
        }else{
            res.status(200).json({success: true, data: book})
        }

})

