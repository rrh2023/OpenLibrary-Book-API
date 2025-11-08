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
    // Add user to req.body
    req.body.user = req.user.id;

    // Check for published author
    const publishedAuthor = await Author.findOne({ user: req.user.id });

    // If the user is not an admin, they can only add one author
    if(publishedAuthor && req.user.role !== 'admin'){
        return next(new ErrorResponse(`The user with ID ${req.user.id} has laready published a bootcamp`, 400))
    }

    const author = await Author.create(req.body);

    res.status(201).json({success: true, data: author});

})

// @desc  Delete author
// @route DELETE /api/v1/author/:id
// @access Private
exports.deleteAuthor = asyncHandler(async (req, res, next) => {

    const author = await Author.finById(req.params.id);

    if(!author){
        return next(new ErrorResponse(`Author not found with id of ${req.params.id}`, 404));
    }else if (author.user.toString() !== req.user.id && req.user.role !== 'admin') {
        // Make sure user is author owner
        return next(new ErrorResponse(`User ${req.params.id} is not authorized to delete this author`))
    }else{
        author.remove()
        res.status(200).json({success: true, data: author})
    }


})

