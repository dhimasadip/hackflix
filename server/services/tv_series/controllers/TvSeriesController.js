const TvSeries = require('../models/TvSeries')

class TvSeriesController {
    static list(req, res, next) {
        TvSeries.findAll()
            .then(data => res.status(200).json(data))
            .catch(console.log)
    }

    static findTv(req, res, next) {
        const { id } = req.params

        TvSeries.findById(id)
            .then(data => res.status(200).json(data))
            .catch(console.log)
    }

    static insert(req, res, next) {
        const { title, overview, popularity, poster_path, tags } = req.body
        const arrTags = tags.split(',').map(el => el.trim())

        const newTvseries = { title, overview, popularity: +popularity, poster_path, tags: arrTags }

        TvSeries.create(newTvseries)
            .then(data => res.status(201).json(data))
            .catch(console.log)
    }

    static destroy(req, res, next) {
        const { id } = req.params

        TvSeries.delete(id)
            .then(data => res.status(200).json(data))
            .catch(console.log)
    }
}

module.exports = TvSeriesController