const express = require('express');
const dataPartidas = require('../data/partida');
const Partida = require('../model/Partida');
const router = express.Router();

const verify = require('./verifyToken');

router.get('/',verify, async function(req, res, next) {
    let partidas = await dataPartidas.getPartidas();
    res.send(partidas);
  });
  
  
  router.get('/:id', async (req, res, next)=>{
      console.log('partidaId' ,req.params.id);
      // res.send('algo')
      let partida = await dataPartidas.getPartida(req.params.id);
      res.send(partida);
  });
    
  
  
router.post('/',verify,async(req,res)=>{
  
      let result = await dataPartidas.pushPartida(req,res
      );
      });
  

router.delete('/:id', async (req, res, next)=>{
    let result = await dataPartidas.deletePartida(req.params.id);

    res.send(result);
});

router.put('/:id', async (req, res, next)=>{
    let result = await dataPartidas.updatePartida(
        {
            _id: req.params.id,
            name: req.body.name,
            players: req.body.players,
            date: req.body.date
        }
    );

    res.send(result);
});

module.exports = router;