const express = require('express')
const dotenv = require('dotenv')

// Load env vars
dotenv.config({path: './config/config.env'})

const app = express();

app.get('/', (req, res) => {
    res.sendStatus(400)
})

app.get('/api/v1/books', (req, res) => {
    res.json({ name: 'Brad'})
    res.send('Hello from express')
    res.sendStatus(400).json({success: false, date: {id : 1}})
})

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log())