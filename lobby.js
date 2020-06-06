const express = require('express');
const dataSalas = require('./data/sala');
const Sala = require('./model/Sala');

const users=[];
const salas=[{id:1,
            name:"river",
            users:[],
            cantMaxUsers:4
        }];
let url="http://localhost:3001/api/sala"

let token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWM2ZjBjODIzOTJiNzAwNGMyM2VkMDUiLCJpYXQiOjE1OTA3MDY2ODl9.CKuaxvtahrtWTrkfBikmTvCd3E8inmoJIAl-yjjrga4';

async function addSala(salaName){
    console.log(`addSala "salaName" ${salaName}`)
    let sala = await dataSalas.pushSala(salaName
            );
    // salas.push(sala);
    // console.log ("addSala salas ",salas);
    return {sala } ;
        

}



const addUserLobby= ({id,username,lobby}) => {
    // Javascript Mastery = javascriptmastery
    username = username.trim().toLowerCase();
    lobby = lobby.trim().toLowerCase();
    console.log (`addUserLobby username ${username} lobby ${lobby}`);


    const existingUser= users.find((user) => user.lobby === lobby && user.username === username);
    if (existingUser){
        return { error: 'Username is taken'};
    }
    const user = {id,username,lobby};
    users.push(user);
    console.log ("addUserLobby users ",users);
    return {user } ;
}

const addUserSala= ({id,username,sala}) => {
    // Javascript Mastery = javascriptmastery
    username = username.trim().toLowerCase();
    sala = sala.trim().toLowerCase();
    console.log (`addUserSala username ${username} sala ${sala}`);

    const sal= salas.find((sal) => sal.sala === sala.sala);
    const existingUser=sal.find((user) => user.username=== username);
    if (existingUser){
        return { error: 'Username is already in the sala'};
    }

    const user = {id,username,lobby};
    salas.find(e => {
        if (e.sala === sala.sala)
            e.users.push(user)}
            );
    console.log ("addUserSala users ",users);
    return {user } ;
}

const removeUserLobby = (id) => {
    const index =users.findIndex((user) => user.id===id);

    if(index !==1){
        return users.splice(index,1)[0];
    }
}


const getUserLobby = (username) => users.find((user) =>{console.log ("user.username" ,user.username);
     if(user.username ===username){return user}
    }
    );


const getUsersInLobby = (lobby) => users.filter((user) => user.lobby===lobby);


const addSalaLobby= async({id,username,name,lobby,cantMaxUsers}) => {
    // Javascript Mastery = javascriptmastery
    name = name.trim().toLowerCase();
    console.log ("addSalaLobby name ",name);
    console.log ("addSalaLobby username ",username);

    const existingSala= salas.find((sala) => sala.name === name);
    if (existingSala){
        console.log('Sala already exists');
        return { error: 'Sala already exists'};
    }
    
    user=getUserLobby(username);
    console.log ("getUserLobby dentro de addSalaLobby  user ",user)
    const users=[]
    users.push(user)
    Room= await addSala(name)
    console.log ("Room");
    console.log (Room);
    console.log ("Sala");
    console.log (Room.sala._id);
    id=Room.sala._id;

    newSala= {id,name,users,cantMaxUsers};   
    console.log ("newSala");
    console.log (newSala);
    salas.push(newSala);
    console.log ("addSalaLobby salas ",salas)
    return {newSala } 
}


const getSalasInLobby = () => {
     console.log ("getSalasInLobby salas", salas); return salas};



module.exports = {addUserLobby, removeUserLobby, getUserLobby, getUsersInLobby,addSalaLobby,getSalasInLobby};