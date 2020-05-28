const Partida = require('../model/Partida');

async function getPartidas(){
    const collection= await Partida.find();
    return collection;
}

async function getPartida(partidaId){
    const partida= await Partida.findOne({_id: partidaId});
    return partida;
}


async function pushPartida(req,res){

    //Check if the sala exists
    const nameExist= await Partida.findOne({name: req.body.name});
    if(nameExist) return res.status(400).send('Partida already exists');
    //Create a new Partida
    const partida = new Partida({
    name: req.body.name,
    active: true
    });
    try{            
        const savePartida=await partida.save();
        return res.send({partida: partida._id});
        }
    catch(err){
        return res.status(400).send(err);
    }
    
    
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