const connection = require("./connection");
const Partida = require('../model/Partida');

async function getPartidas(){
    const clientmongo = await connection.getConnection();
    const collection = clientmongo.db("nombre_bd")
        .collection("nombre_collection")
        .find()
        .toArray();

    return collection;
}

async function getPartida(partidaId){
    const clientmongo = await connection.getConnection();
    const doc = await clientmongo.db("nombre_bd")
        .collection("nombre_collection")
        .findOne({_id:parseInt(partidaId)});

    return doc;
}

async function pushPartida(partida){
    const clientmongo = await connection.getConnection();
    const result = await clientmongo.db("nombre_bd")
        .collection("nombre_collection")
        .insertOne(partida);

    return result;
}

async function updatePartida(partida){
    const clientmongo = await connection.getConnection();
    const query = {_id: parseInt(partida._id)};
    const newvalues = {$set:
        {
            name: partida.name,
            players: partida.players,
            date: partida.date
        }
    };

    const result = await clientmongo.db("nombre_bd")
        .collection("nombre_collection")
        .updateOne(query,newvalues);

    return result;
}

async function deletePartida(partidaId){
    const clientmongo = await connection.getConnection();

    const result = await clientmongo.db("nombre_bd")
        .collection("nombre_collection")
        .deleteOne({_id: parseInt(partidaId)});

    return result;
}

module.exports = {getPartidas, getPartida, pushPartida, updatePartida, deletePartida};