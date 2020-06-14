// const connection = require("./connection");
const Sala = require('../model/Sala');
const {salaValidation, loginValidation}=require('../validation');


async function getSalas(){
    const collection= await Sala.find({isActive: true});
    return collection;
}

async function getSala(salaId){
    const sala= await Sala.findOne({_id: salaId});
    return sala;
}



async function pushSala(req,res){

    const {error} = salaValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    //Check if user exist
    const salaExist= await Sala.findOne({salaName: req.body.salaName, isActive:true});
    if(salaExist) return res.status(400).send('Sala already exists');
    //Hash passwods
    console.log("salaName: ",req.body.salaName)
    console.log("isActive: ",req.body.isActive)
    console.log("players: ",req.body.players)
    console.log("cantMaxUsers: ",req.body.cantMaxUsers)
    //Create a new user
    const sala = new Sala({
        salaName: req.body.salaName,
        isActive: req.body.isActive,
        players: req.body.players,
        cantMaxUsers: req.body.cantMaxUsers,
               
        
    });
    console.log("NewSala: ",sala)
    // console.log("players: ",req.body.players)
    
    //res.send('Register')
    try{
        const savedSala=await sala.save();
        res.send({sala: sala._id});

    }catch(err){
        res.status(400).send(err);
    }

};


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