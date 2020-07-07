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


router.get('/:id',verify, async (req, res, next)=>{
    console.log('salaId' ,req.params.id);
    // res.send('algo')
    let sala = await dataSalas.getSala(req.params.id);
    res.send(sala);
});

router.post('/',verify,async(req,res)=>{

    let result = await dataSalas.pushSala(req,res
    );
    });


router.put('/:id',verify,async (req, res, next)=>{
    console.log("update sala")
    let result = await dataSalas.updateSala(req, res
    );

    // res.send(result)
});

router.delete('/:id', verify,async (req, res, next)=>{
    let result = await dataSalas.deleteSala(req.params.id);
    res.send(result);
});


module.exports = router;