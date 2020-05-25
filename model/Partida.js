const mongoose = require('mongoose');
const partidaSchema = new mongoose.Schema(
    {
        name: {
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
                required: ["name", "isWinner"],
                properties: {
                    name: {
                        type: String,
                        require:true,
                        min: 3,
                        max: 255
                    },
                    isWinner: {
                        type: boolean
                    }
                }
            }
        },
        date: {
            type: Date,
            default: Date.now
        }
    }
)

module.exports = mongoose.model('Partida', partidaSchema); 