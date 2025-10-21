// @desc Get all books
// @route GET /api/v1/book
// @access Public
exports.getBooks = (req,res,next) => {
    res.status(200).json({success: true, msg: 'Show all books'})
}

// @descs Get single book
// @route Get /api/v1/book/:id
// @access Public
exports.getBook = (req, res, next) => {
    res.status(200).json({success: true, msg: `Show book ${req.params.id}`})
}

// @desc Create new book
// @route POST /api/v1/book
// @access Private
exports.createBook = (req, res, next) => {
    res.status(200).json({success: true, msg: 'Create new book'})
}

// @desc  Delete book
// @route DELETE /api/v1/book/:id
// @access Private
exports.deleteBook = (req, res, next) => {
    res.status(200).json({success:true, msg: `Delete book ${req.params.id}`})
}

