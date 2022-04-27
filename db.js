const {MongoClient} = require('mongodb');

const url = 'mongodb://localhost:27017/myFirstDatabase'
let dbConnection;

module.exports = {
    connectToDb: (callback) => {
        MongoClient.connect(url, {useUnifiedTopology : true})
        .then((client) => {
            dbConnection = client.db();
            return callback()
        }).catch(error => {
            console.log(error);
            return callback(error)
        })
    },
    getDb: () => dbConnection
}
