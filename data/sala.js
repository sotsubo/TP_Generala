// const connection = require("./connection");
const Sala = require('../model/Sala');

async function getSalas(){
    const collection= await Sala.find({active: true});
    return collection;
}

async function getSala(salaId){
    const sala= await Sala.findOne({_id: salaId});
    return sala;
}



async function pushSala(req,res){

    //Check if the sala exists
    const nameExist= await Sala.findOne({name: req.body.name});
    if(nameExist) return res.status(400).send('Sala already exists');
    //Create a new sala
    const sala = new Sala({
    name: req.body.name,
    active: true
    });
    try{            
        const saveSala=await sala.save();
        return res.send({sala: sala._id});
        }
    catch(err){
        return res.status(400).send(err);
    }
    
    
}

// try{
//     const saveSala=await sala.save();
//     res.send({sala: sala._id});

// }catch(err){
//     res.status(400).send(err);
// }

// }

//     const clientmongo = await connection.getConnection();
//     const result = await clientmongo.db("nombre_bd")
//         .collection("nombre_collection")
//         .insertOne(sala);

//     return result;
// }

async function updateSala(req,res){
    console.log('id', req.params.id);
    console.log('body', req.body);
    
    const result= await Sala.findOneAndUpdate({_id: req.params.id}, req.body, {upsert: true}, function(err, doc) {
        if (err) return res.send(500, {error: err});
        return res.send('Succesfully saved.');
    });
}

async function deleteSala(salaId){
    const result= await Sala.deleteOne({_id: salaId});
    return result;

}

module.exports = {getSalas, getSala, pushSala, updateSala, deleteSala};