const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async')
const Author = require('../models/Author')

// @desc Get all author
// @route GET /api/v1/authors
// @access Public
exports.getAuthors = asyncHandler(async (req,res,next) => {
    

    res.status(200).json(res.advancedResults)

})

// @descs Get single author
// @route GET /api/v1/author/:id
// @access Public
exports.getAuthor = asyncHandler(async (req, res, next) => {
        const author = await Author.findById(req.params.id);

        if(!author){
            return next(new ErrorResponse(`Author not found with id of ${req.params.id}`, 404));
        }else{
            res.status(200).json({success: true, data: author})
        }
})

// @desc Create new author
// @route POST /api/v1/author
// @access Private
exports.createAuthor = asyncHandler(async (req, res, next) => {
        const author = await Author.create(req.body)
        res.status(201).json({success: true, data: author})
})

// @desc  Delete author
// @route DELETE /api/v1/author/:id
// @access Private
exports.deleteAuthor = asyncHandler(async (req, res, next) => {

        const author = await Author.finById(req.params.id);

        if(!author){
            return next(new ErrorResponse(`Author not found with id of ${req.params.id}`, 404));
        }else{
            res.status(200).json({success: true, data: author})
        }

        author.remove()

})

