const express = require('express');
const dataPartidas = require('../data/partida');
const Partida = require('../model/Partida');
const router = express.Router();

router.get('/', async function(req, res, next){
    let inventors = await dataPartidas.getPartidas();

    res.send(partidas);
});

router.get('/:id', async (req, res, next) => {
    let inventor = await dataPartidas.getPartida(req.params.id);

    res.send(partida);
});

router.post('/', async (req, res, next) =>{
    let result = await dataPartidas.pushPartida(
        {
            name: req.body.name,
            players: req.body.players,
            date: req.body.date
        }
    );

    res.send(result);
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