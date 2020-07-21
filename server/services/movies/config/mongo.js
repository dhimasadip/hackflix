const { MongoClient } = require("mongodb");

const db_url = "mongodb://mongo:27017";
const client = new MongoClient(db_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db_name = process.env.DATABASE_NAME;

client.connect();
const db = client.db(db_name);


module.exports = db;

