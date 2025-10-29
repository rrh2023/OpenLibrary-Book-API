const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async')
const Author = require('../models/Author')

// @desc Get all author
// @route GET /api/v1/authors
// @access Public
exports.getAuthors = asyncHandler(async (req,res,next) => {
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
    query = Author.find(JSON.parse(queryStr)).populate('books');

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
    const total = await Author.countDocuments()

    query = query.skip(startIndex).limit(limit);

    // Executing query
    const authors = await query

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

    res.status(200).json({success: true, count:authors.length, pagination: pagination, data: authors})

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

