const express = require('express');


//socket 
const socketio= require('socket.io');
const http = require('http');
const cors = require('cors')
// var corsOptions = {
//     origin: '*',
//     optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
//   }
const {addUser, removeUser, getUser , getUsersInRoom} = require('./users.js');
const {addUserLobby, removeUserLobby, getUserLobby , getUsersInLobby,addSalaLobby,getSalasInLobby} = require('./lobby.js');

const PORT=process.env.PORT||3001;



const app = express();
app.use(cors());

// app.use('*', cors(corsOptions));
const server = http.createServer(app);
const io = socketio(server);

const mongoose = require('mongoose');
const dotenv= require('dotenv')
// import Routes
const authRoute=require('./routes/auth');
const postRoute=require('./routes/posts');
const salaRoute=require('./routes/salas');
const partidaRoute=require('./routes/partidas');



dotenv.config();
// app.set('port',process.env.PORT || 3001);


//Connecto to DB
mongoose.connect(
    process.env.DB_CONNECT,
    { useUnifiedTopology: true,useNewUrlParser: true  } ,
    ()=> console.log('connected to db!')
);

//Midaleware
app.use(express.json());

//Route middleware

app.use('/api/user',authRoute);
app.use('/api/posts',postRoute);
app.use('/api/partida',partidaRoute);

app.use('/api/sala',salaRoute);


app.use(cors());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');

    // authorized headers for preflight requests
    // https://developer.mozilla.org/en-US/docs/Glossary/preflight_request
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();

    app.options('*', (req, res) => {
        // allowed XHR methods  
        res.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS');
        res.send();
    });
});

io.on('connection',(socket)=>{
    console.log('We have a new connection!!!');
    //console.log(socket.id);
    //console.log("llamo a getSalas y despues hago un emit");

    //console.log(getSalasInLobby());
    console.log("connection socket", socket.id);

   // io.to(socket.id).emit('refreshSalas', getSalasInLobby());      
   socket.on('tirardado',( callback) => {
    console.log('tirardado' );
    
    callback(); 
   }
   );
    socket.on('joinLobby',({username,lobby}, callback) => {
        // console.log('joinLobby' );
        
        // console.log('a: ' ,username );
        // console.log('b: ' ,lobby );
        const {error, user} = addUserLobby({id: socket.id, username , lobby});
        
        if(error) return  callback(error);
        
        // socket.emit('messageLobby',{user:'admin' , text:` ${user.username} , welcome to the lobby ${user.lobby}` });

        // socket.broadcast.to(user.lobby).emit('messageLobby' ,{user: 'admin', text: `${user.username} has joined!`});
        console.log('user.lobby: ', user.lobby );
        console.log(`user  ${user} socket ${socket.id}`);
        socket.join(user.lobby);
        // io.to(socket.id).emit('lobbySala',{salas: getSalasInLobby()});    

        // io.to(user.lobby).emit('lobbyData',{lobby: user.lobby , users: getUsersInLobby(user.looby)});        

        callback();
    });


    socket.on('crearSala',({username,sala,lobby,cantMaxUsers}, callback) => {
        console.log('crearSala: ' ,sala )
        const {error, salon} = addSalaLobby({id: socket.id,username, sala,lobby,cantMaxUsers });
        socket.join(sala);
        console.log("crearSala socket", socket.id);
        if(error) return  callback(error);
        console.log("llamo a getSalas y despues hago un emit refreshSalas");
        // socket.broadcast.to(lobby).emit('refreshSalas', getSalasInLobby());   
        io.sockets.in(lobby).emit('refreshSalas',  getSalasInLobby()  );    
        console.log("despues refreshSalas");

      callback();
    });
    socket.on('recibi',({sala,lobby}, callback) => {
        console.log('a: ' ,sala );
        console.log('b: ' ,lobby );


        callback(); 
    });


    socket.on('getSalas',({username,lobby}, callback) => {
        console.log('getSalas' );
        
        console.log('a: ' ,username );
        console.log('b: ' ,lobby );
        io.sockets.in(lobby).emit('refreshSalas',  getSalasInLobby()  );    

        // io.to(socket.id).emit('lobbySala',{salas: getSalasInLobby()});    


        callback();
    });


    socket.on('join',({name,room}, callback) => {
        const {error, user} = addUser({id: socket.id, name , room});
        
        if(error) return  callback(error);
        
        socket.emit('message',{user:'admin' , text:` ${user.name} , welcome to the room ${user.room}` });

        socket.broadcast.to(user.room).emit('message' ,{user: 'admin', text: `${user.name} has joined!`});
        socket.join(user.room);
        io.to(user.room).emit('roomData',{room: user.room , users: getUsersInRoom(user.room)});        
        callback();
    });

    socket.on('sendMessage', (message,callback) => {
        const user= getUser (socket.id);
        io.to(user.room).emit('message',{user: user.name, text: message})
        io.to(user.room).emit('rooData',{room: user.room, users:  getUsersInRoom(user.room)});  

        callback();
    });
    socket.on('disconnect',()=>{
        const user= removeUser(socket.id)
        if(user){
            io.to(user.room).emit('message'),{user:'admin', text: `${user.name} has left`}
        }
        // console.log('User has left!!!');

    })
})

// app.listen(app.get('port'),()=>{ 
//     console.log('Server on port', app.get('port'));
// });

server.listen(PORT, ()=>console.log (`Server has started on port ${PORT}`));
