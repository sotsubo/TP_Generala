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
const { deleteAllUserLobby} = require('./data/userLobby.js');
const {deleteSalasAll} = require('./data/sala2');

const dataSalas = require('./data/sala');
const Sala = require('./model/Sala');
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

const userLobbyRoute=require('./routes/userLobby');


dotenv.config();
// app.set('port',process.env.PORT || 3001);


//Connecto to DB
mongoose.connect(
    process.env.DB_CONNECT,
    { useUnifiedTopology: true,useNewUrlParser: true  } ,
    ()=> console.log('connected to db!')
);

function resetDB(){
    deleteSalasAll();
    deleteAllUserLobby();

}
resetDB();

//Midaleware
app.use(express.json());

//Route middleware

app.use('/api/user',authRoute);
app.use('/api/posts',postRoute);
app.use('/api/partida',partidaRoute);

app.use('/api/sala',salaRoute);

app.use('/api/userlobby',userLobbyRoute);

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
        console.log('joinLobby' );
        
        console.log('username: ' ,username );

        console.log('lobby: ' ,lobby );

        socket.emit('refreshSalas',  getSalasInLobby()  );    
        
        
        if (username !== undefined && username !== null ) {
        // const user = addUserLobby({id: socket.id, username , lobby});
        
        console.log("lobby " );
        console.log('user.lobby: ', lobby );
        console.log(`user  ${username} socket ${socket.id}`);
        socket.join('lobby');
        }
        else {
            console.log("username is undefinded");
        }
        callback();
    });

    socket.on('envioDatos',({dados,puntos,sala,salaName}, callback) => {
        // console.log('envioDatos: ' ,sala )
        // console.log("envioDatos dados",dados);
        // console.log("envioDatos puntos",puntos);
        // console.log('sala.salaName: ' ,sala.salaName )
        // console.log("envioDatos socket", socket.id);
        // console.log('salaName: ' ,salaName )
        io.sockets.in(sala.salaName).emit('reciboDatos' ,{dados,puntos,sala});    

        callback();
    });

    socket.on('crearSala',async({username,name,lobby,cantMaxUsers}, callback) => {
        console.log('crearSala: ' ,name )
        console.log("  lobby", lobby)
        socket.join(name);
        console.log("crearSala socket", socket.id);
        console.log("llamo a getSalas y despues hago un emit refreshSalas");
        io.sockets.in(lobby).emit('refreshSalas' ,{});    
        console.log("despues refreshSalas");
        socket.join(lobby);
        socket.emit('refreshSalas',  {} );    

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
        io.sockets.in(lobby).emit('refreshSalas'  );    
        callback();
    });


    socket.on('joinSala',({username,sala,lobby}, callback) => {
        // console.log('joinSala' );
        // console.log('username: ' ,username );
        // console.log('sala.salaName: ' ,sala.salaName );
        // console.log('sala: ' ,sala );
        // console.log('emit refreshSala' );
        io.sockets.in(sala.salaName).emit('refreshSala',{sala});    
        socket.join(sala.salaName);
        callback();
    });
    socket.on('joinMatch',({username,sala,lobby}, callback) => {
        console.log('joinMatch' );
        
        console.log('username: ' ,username );
        console.log('sala.salaName: ' ,sala.salaName );
        console.log('sala: ' ,sala );
        console.log("joinMatch socket", socket.id);

        // io.sockets.in(lobby).emit('refreshSalas');    
        // io.sockets.in(lobby).emit('refreshSala',{sala});    
        socket.join(sala.salaName);
        callback();
    });
    
    socket.on('leftSala',({username,sala,lobby}, callback) => {
        console.log('leftSala' );
        
        console.log('username: ' ,username );
        console.log('sala.salaName: ' ,sala.salaName );
        console.log('sala: ' ,sala );
        console.log('emit refreshSala' );
        socket.leave(sala);

        io.sockets.in(sala.salaName).emit('refreshSala',{sala});    
        io.sockets.in(lobby).emit('refreshSalas'  );    

        // io.sockets.in(lobby).emit('refreshSalas');    
        // io.sockets.in(lobby).emit('refreshSala',{sala});    
        callback();
    });
    socket.on('goToMatch',({username,sala,lobby}, callback) => {
        console.log('goToMatch' );
        
        console.log('username: ' ,username );
        console.log('sala: ' ,sala );
        // socket.leave(sala);
        console.log('emit goToMatch' );
        
        io.sockets.in(sala).emit('goToMatch');    

        // io.sockets.in(lobby).emit('refreshSalas');    
        // io.sockets.in(lobby).emit('refreshSala',{sala});    
        callback();
    });
    socket.on('refreshSala',({username,name,lobby}, callback) => {
        console.log('leftSala' );
        
        console.log('username: ' ,username );
        console.log('name: ' ,name );
        io.sockets.in(lobby).emit('refreshSalas'  );    
        
        // const {error, user} = addUser({id: socket.id, name , room});
        
        // if(error) return  callback(error);
        
        // socket.emit('message',{user:'admin' , text:` ${user.name} , welcome to the room ${user.room}` });

        // socket.broadcast.to(user.room).emit('message' ,{user: 'admin', text: `${user.name} has joined!`});
        // socket.join(user.room);
        // io.to(user.room).emit('roomData',{room: user.room , users: getUsersInRoom(user.room)});        
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
    
    socket.on('quitLobby',()=>{
        console.log("quitLobby")
        const user= removeUser(socket.id)
        if(user){
            io.to(user.room).emit('message'),{user:'admin', text: `${user.name} has left`}
        }
        // console.log('User has left!!!');

    })
    socket.on('disconnect',()=>{
        console.log("disconnect")
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
