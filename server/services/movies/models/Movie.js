const { ObjectId } = require('mongodb')
const db = require('../config/mongo')

const movie = db.collection(`${process.env.COLLECTION_NAME}`)

class MovieModel {
    static find() {
        return movie.find().toArray()
    }

    static findById(id) {
        return movie.findOne({ _id: ObjectId(id) })
    }

    static create(newMovie) {
        return movie.insertOne(newMovie)
    }

    static delete(id) {
        return movie.deleteOne({ _id: ObjectId(id) })
    }
}

module.exports = MovieModel