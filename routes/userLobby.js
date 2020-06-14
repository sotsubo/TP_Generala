const express = require('express');
const dataUserLobby = require('../data/userLobby');
const UserLobby = require('../model/UserLobby');

const router = express.Router();
const verify = require('./verifyToken');
const {userLobbyValidation}=require('../validation');


/* GET salas activas listing. */
// router.get('/', async function(req, res, next) {
//   let salas = await dataSalas.getSalas();
//   res.send(salas);
// });
// /* GET usersLobby activas listing. */
router.get('/', async function(req, res, next) {
  let usersLobby = await dataUserLobby.getUsersLobby();
  res.send(usersLobby);
});


router.get('/:id', async (req, res, next)=>{
    console.log('userId' ,req.params.id);
    // res.send('algo')
    let userLobby = await dataUserLobby.getUserLobby(req.params.id);
    res.send(userLobby);
});



router.post('/',verify,async(req,res)=>{
    // Lets validate the data before we create a user
    console.log("Post" ,req.body.userId)
    const {error} = userLobbyValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    //Check if user exist in the Lobby
    const userExist= await UserLobby.findOne({userId: req.body.userId});
    if(userExist) return res.status(200).send('User already exists');
    const userLobby = new UserLobby({
        userId: req.body.userId,
        username: req.body.username
    });
    try{
    const savedUser=await userLobby.save();
    res.send(userLobby);

    }catch(err){
        res.status(400).send(err);
    }

});



router.delete('/:id',verify, async (req, res, next)=>{
    console.log("Delete ",req.body.userId)
    let result = await dataUserLobby.deleteUserLobby(req.body.userId);
    res.send(result);
});

module.exports = router;