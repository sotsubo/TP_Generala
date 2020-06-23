const mongoose= require('mongoose');
const salaSchema =new mongoose.Schema({
    salaName:{
        type: String,
        require:true,
        min: 3,
        max: 255
    },
    players: {
        type: Array,
        minItems: 2,
        maxItems: 4,
        uniqueItems: true,
        additionalProperties: false,
        items: {
            type: Object,
            required: ["userName","userId", "isWinner"],
            properties: {
                userName: {
                    type: String,
                    require:true,
                    min: 3,
                    max: 255
                },
                userId:{
                    type: String,
                    
                },
                isWinner: {
                    type: Boolean
                }
            }
        }
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
    isActive: {
        type: Boolean,
        default: true    
    },
    cantMaxUsers:{
        type: Number,
        // required: true,
        max: 4,
        min:1


    }

})

module.exports = mongoose.model('Sala', salaSchema); 