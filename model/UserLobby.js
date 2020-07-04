const mongoose= require('mongoose');
const UserLobbySchema =new mongoose.Schema({
    userId:{
        type: String,
        require:true
    },   
    username:{
        type: String,
        required: true,
        min: 5,
        max:255
}

})

module.exports = mongoose.model('UserConnect', UserLobbySchema); 