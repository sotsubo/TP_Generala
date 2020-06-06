const express = require('express');
const dataSalas = require('../data/sala2');
const Sala = require('../model/Sala');

const router = express.Router();
const verify = require('./verifyToken');

/* GET salas activas listing. */
router.get('/', async function(req, res, next) {
  let salas = await dataSalas.getSalas();
  res.send(salas);
});


router.get('/:id', async (req, res, next)=>{
    console.log('salaId' ,req.params.id);
    // res.send('algo')
    let sala = await dataSalas.getSala(req.params.id);
    res.send(sala);
});

// router.post('/', async (req, res, next)=>{
//     let result = await dataSalas.pushSala(
//         {
//             _id: req.body._id,
//             first: req.body.first,
//             last: req.body.last,
//             year: req.body.year
//         }
//     );

//     res.send(result)
// });



router.post('/',async(req,res)=>{

    let result = await dataSalas.pushSala(req,res
    );
    });

// //Check if the sala exists
// const nameExist= await Sala.findOne({name: req.body.name});
// if(nameExist) return res.status(400).send('Sala already exists');
// //Create a new sala
// const sala = new Sala({
//     name: req.body.name
// });
// try{
//     const saveSala=await sala.save();
//     res.send({sala: sala._id});

// }catch(err){
//     res.status(400).send(err);
// }

// }
// );



router.put('/:id', async (req, res, next)=>{
    let result = await dataSalas.updateSala(req, res
    );

    // res.send(result)
});

router.delete('/:id', async (req, res, next)=>{
    let result = await dataSalas.deleteSala(req.params.id);
    res.send(result);
});

module.exports = router;