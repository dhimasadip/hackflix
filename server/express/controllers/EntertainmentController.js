const { TvSeriesServer, MovieServer } = require('../config/axios')
const Redis = require('ioredis')
const redis = new Redis()

class EntertainmentController {

    static async getAll(req, res, next) {
        let tv = await redis.get('tv')
        let movies = await redis.get('movies')

        if (tv && movies) {
            tv = JSON.parse(tv)
            movies = JSON.parse(movies)

            res.status(200).json({ tv, movies })
        } else {
            try {
                const { data: listTv } = await TvSeriesServer.get('/')
                const { data: listMovies } = await MovieServer.get('/')

                await redis.set('tv', JSON.stringify(listTv))
                await redis.set('movies', JSON.stringify(listMovies))
                
                res.status(200).json({ tv: listTv, movies: listMovies })
                
        } catch (err) {
                console.log(err)
            }
        }
    }
}

module.exports = EntertainmentController