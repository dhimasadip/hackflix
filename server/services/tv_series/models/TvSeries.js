const { ObjectId } = require('mongodb')
const db = require('../config/mongo')

const tvseries = db.collection(process.env.COLLECTION_NAME)

class TvSeriesModels {
    static findAll() {
        return tvseries.find().toArray()
    }

    static findById(id) {
        return tvseries.findOne({ _id: ObjectId(id) })
    }

    static create(newTvseries) {
        return tvseries.insertOne(newTvseries)
    }

    static delete(id) {
        return tvseries.deleteOne({ _id: ObjectId(id) })
    }
}

module.exports = TvSeriesModels