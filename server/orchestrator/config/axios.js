const axios = require('axios')
const movieUrl = process.env.MOVIES_SERVICES_PATH
const tvUrl = process.env.TV_SERIES_SERVICES_PATH

const tvServer = axios.create({
    baseURL: tvUrl
})

const movieServer = axios.create({
    baseURL: movieUrl
})

module.exports = { tvServer, movieServer }