const express = require('express')
const dotenv = require('dotenv')
const morgan = require("morgan")
const connectDB = require('./config/db')

// Load env vars
dotenv.config({path: './config/config.env'})

// Connect ot database
connectDB()

// Route files
const books = require('./routes/books');

const app = express();

// Dev logging middleware
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

// Mount routers
app.use('/api/v1/books', books)

const PORT = process.env.PORT || 5000

const server = app.listen(PORT, console.log())

// Handle unhandled promise rejections
process.on('unhandledRejection',(err, promise) => {
    console.log(`Error: ${err.message}`);
    // Close server & exit process
    server.close(() => process.exit(1))
})