require('dotenv').config()
const express = require('express')
const app = express()
const router = require('./routes')
const PORT = process.env.PORT || 3002

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/tv-series', router)

app.listen(PORT, _ => console.log(`tv-series service running at: http://localhost:${PORT}`))