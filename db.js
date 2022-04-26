const {MongoClient} = require('mongodb');

const url = 'mongodb+srv://EL_sadek:AhmedSadek01212758221@cluster0.rsemw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
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