const ErrorResponse = require('../utils/errorResponse');
const Book = require('../models/Book')

// @desc Get all books
// @route GET /api/v1/book
// @access Public
exports.getBooks = async (req,res,next) => {
    try {
        const books = await Book.find()

        res.status(200).json({success: true, count:books.length, data: books})
    } catch (error) {
        next(error);
    }
}

// @descs Get single book
// @route GET /api/v1/book/:id
// @access Public
exports.getBook = async (req, res, next) => {
    try {
        const book = await Book.findById(req.params.id);

        if(!book){
            return next(new ErrorResponse(`Book not found with id of ${req.params.id}`, 404));
        }else{
            res.status(200).json({success: true, data: book})
        }

        
    } catch (error) {
        next(error);
    }
}

// @desc Create new book
// @route POST /api/v1/book
// @access Private
exports.createBook = async (req, res, next) => {
    try {
        const book = await Book.create(req.body)
        res.status(201).json({success: true, data: book})
    } catch (error) {
        next(error);
    }
    
}

// @desc  Delete book
// @route DELETE /api/v1/book/:id
// @access Private
exports.deleteBook = async (req, res, next) => {

    try {
        const book = await Book.findByIdAndDelete(req.params.id);

        if(!book){
            return next(new ErrorResponse(`Book not found with id of ${req.params.id}`, 404));
        }else{
            res.status(200).json({success: true, data: book})
        }
    } catch (error) {
        next(error);
    }
}

