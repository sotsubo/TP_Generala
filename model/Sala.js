const mongoose= require('mongoose');
const salaSchema =new mongoose.Schema({
    name:{
        type: String,
        require:true,
        min: 3,
        max: 255
    },
    private:{
        type: Boolean    
    },
    quantity:{
        type: Number,
        // required: true,
        max: 4,
        min:1
    },
    active: {
        type: Boolean,
        default: true    
    }

})

module.exports = mongoose.model('Sala', salaSchema); 