// const connection = require("./connection");
const Sala = require('../model/Sala');

async function getSalas(){
    const collection= await Sala.find({isActive: true});
    return collection;
}

async function getSala(salaId){
    const sala= await Sala.findOne({_id: salaId});
    return sala;
}



async function pushInventor(inventor){
    const clientmongo = await conecction.getConnection();

    const result = await clientmongo.db('sample_betp2')
        .collection('inventors')
        .insertOne(inventor);
    
    return result;
}

async function pushSala(name){

    console.log(`pushSala ${name}`);
    //Check if the sala exists
    // const nameExist= await Sala.findOne({name: name});
    // if(nameExist) return err='Sala already exists';
    const sala = new Sala({
    name: name,
    active: true
    });
    try{            
        const saveSala=await sala.save();
        return saveSala;
        }
    catch(err){
        return err;
    }
    
    
}

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