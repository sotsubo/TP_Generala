const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv= require('dotenv')
// import Routes
const authRoute=require('./routes/auth');
const postRoute=require('./routes/posts');
const salaRoute=require('./routes/salas');
const partidaRoute=require('./routes/partidas');



dotenv.config();
app.set('port',process.env.PORT || 3000);


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



app.listen(app.get('port'),()=>{ 
    console.log('Server on port', app.get('port'));
});
// app.listen(3000,() => console.log ('Server Up and running' ));

