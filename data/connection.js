const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://sotsubo:Guada2015@cluster0-ijn90.mongodb.net/test?retryWrites=true&w=majority";

const client = new MongoClient(uri, {useUnifiedTopology: true, useNewUrlParser: true});

async function getConnection(){
    return await client.connect().catch(err => console.error(err));
}


module.exports = {getConnection};