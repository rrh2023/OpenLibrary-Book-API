const express = require('express')
const dotenv = require('dotenv')

// Route files
const books = require('./routes/books');

// Load env vars
dotenv.config({path: './config/config.env'})

const app = express();

// Mount routers
app.use('/api/v1/books', books)

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log())