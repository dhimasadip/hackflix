const { MovieServer } = require('../config/axios')
const Redis = require('ioredis')
const redis = new Redis()

class MovieController {

    static async list(req, res, next) {

        const movies = await redis.get('movies')

        if (movies) {
            console.log('masuk redis')
            res.status(200).json(JSON.parse(movies))

        } else {
            console.log('masuk server')
            try {
                const { data } = await MovieServer.get('/')
                redis.set('movies', JSON.stringify(data))
                res.status(200).json(data)

            } catch (err) {
                console.log(err)
            }
        }
    }

    static async findById(req, res, next) {
        const { id } = req.params
        const key = `movie_${id}`

        const movie = await redis.get(key)

        if (movie) {
            console.log('masuk redis')
            res.status(200).json(JSON.parse(movie))

        } else {
            console.log('masuk server')
            try {
                const { data } = await MovieServer.get(`/${id}`)
                redis.set(key, JSON.stringify(data))
                res.status(200).json(data)

            } catch (err) {
                console.log(err)
            }
        }
    }

    static async add(req, res, next) {
        const newMovie = req.body

        try {
            const { data } = await MovieServer.post('/', newMovie)
            const key = `movie_${data.insertedId}`
            const [newData] = data.ops

            let oldData = await redis.get('movies')
            oldData = JSON.parse(oldData)
            const movies = oldData.concat(newData)

            await redis.del('movies')
            await redis.set('movies', JSON.stringify(movies))
            await redis.set(key, JSON.stringify(newData))

            res.status(201).json(data)

        } catch (err) {
            console.log(err)
        }
    }

    static async destroy(req, res, next) {
        const { id } = req.params
        const key = `movie_${id}`

        try {
            const { data } = await MovieServer.delete(`/${id}`)
            
            let movies = await redis.get('movies')
            movies = JSON.parse(movies)
            const newMovies = movies.filter(el => el['_id'] != id)
            
            await redis.del('movies')
            await redis.del(key)
            await redis.set('movies', JSON.stringify(newMovies))
            
            res.status(200).json(data)

        } catch (err) {
            console.log(err)
        }

    }
}

module.exports = MovieController