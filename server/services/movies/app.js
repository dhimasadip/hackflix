require('dotenv').config()
const express = require('express')
const app = express()
const router = require('./routes')
const PORT = process.env.PORT || 3001

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/movies', router)

app.listen(PORT, _ => console.log(`movies service running at: http://localhost:${PORT}`))