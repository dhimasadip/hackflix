const axios = require('axios')

const MovieServer = axios.create({
    baseURL: 'http://localhost:3001/movies'
})

const TvSeriesServer = axios.create({
    baseURL: 'http://localhost:3002/tv-series'
})

module.exports = { MovieServer, TvSeriesServer }