const { TvSeriesServer } = require('../config/axios')
const Redis = require('ioredis')
const redis = new Redis()

class TvSeriesController {
    static async list(req, res, next) {
        const tvSeries = await redis.get('tv')

        if (tvSeries) {
            res.status(200).json(JSON.parse(tvSeries))
        } else {
            try {
                const { data } = await TvSeriesServer.get('/')
                redis.set('tv', JSON.stringify(data))
                res.status(200).json(data)
            } catch (err) {
                console.log(err)
            }

        }
    }

    static async findById(req, res, next) {
        const { id } = req.params
        const key = `tv_${id}`
        const tv = await redis.get(key)

        if (tv) {
            res.status(200).json(JSON.parse(tv))
        } else {
            try {
                const { data } = await TvSeriesServer.get(`/${id}`)
                redis.set(key, JSON.stringify(data))
                res.status(200).json(data)

            } catch (err) {
                console.log(err)
            }
        }
    }

    static async add(req, res, next) {
        const newTv = req.body

        try {
            const { data } = await TvSeriesServer.post('/', newTv)
            const key = `tv_${data.insertedId}`
            const [newData] = data.ops

            let oldData = await redis.get('tv')
            oldData = JSON.parse(oldData)
            const newList = oldData.concat(newData)

            await redis.del('tv')
            await redis.set('tv', JSON.stringify(newList))
            await redis.set(key, JSON.stringify(newData))

            res.status(201).json(data)

        } catch (err) {
            console.log(err)
        }
    }

    static async destroy(req, res, next) {
        const { id } = req.params
        const key = `tv_${id}`

        try {
            const { data } = await TvSeriesServer.delete(`/${id}`)
            
            let listTv = await redis.get('tv')
            listTv = JSON.parse(listTv)
            const newList = listTv.filter(el => el['_id'] != id)

            await redis.del('tv')
            await redis.del(key)
            await redis.set('tv', JSON.stringify(newList))

            res.status(200).json(data)

        } catch (err) {
            console.log(err)
        }
    }
}

module.exports = TvSeriesController