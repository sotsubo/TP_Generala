const express = require('express');
const dataSalas = require('../data/sala2');
const Sala = require('../model/Sala');

const router = express.Router();
const verify = require('./verifyToken');

/* GET salas activas listing. */
router.get('/',verify, async function(req, res, next) {
  let salas = await dataSalas.getSalas();
  res.send(salas);
});


router.get('/:id', async (req, res, next)=>{
    console.log('salaId' ,req.params.id);
    // res.send('algo')
    let sala = await dataSalas.getSala(req.params.id);
    res.send(sala);
});

router.post('/',async(req,res)=>{

    let result = await dataSalas.pushSala(req,res
    );
    });


// router.post('/',async(req,res)=>{
//     // Lets validate the data before we create a user
//     console.log("req.body")
//     console.log(req.body);
//     const {error} = salaValidation(req.body);
//     if(error) return res.status(400).send(error.details[0].message);
//     //Check if user exist
//     const salaExist= await Sala.findOne({salaName: req.body.salaName, isActive:true});
//     if(salaExist) return res.status(400).send('Sala already exists');
//     //Hash passwods
//     console.log("salaName: ",req.body.salaName)
//     console.log("isActive: ",req.body.isActive)
//     console.log("players: ",req.body.players)
//     //Create a new user
//     const sala = new Sala({
//         salaName: req.body.salaName,
//         isActive: req.body.isActive,
//         players: req.body.players,
               
        
//     });
//     console.log("NewSala: ",sala)
//     // console.log("players: ",req.body.players)
    
//     //res.send('Register')
//     try{
//         const savedSala=await sala.save();
//         res.send({sala: sala._id});

//     }catch(err){
//         res.status(400).send(err);
//     }

// });




router.put('/:id', async (req, res, next)=>{
    console.log("update sala")
    let result = await dataSalas.updateSala(req, res
    );

    // res.send(result)
});

router.delete('/:id', async (req, res, next)=>{
    let result = await dataSalas.deleteSala(req.params.id);
    res.send(result);
});


module.exports = router;