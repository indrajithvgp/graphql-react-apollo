const mongoose = require('mongoose')

const recipeSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    instructions:{
        type: String,
        required: true
    },
    likes:{
        type: Number,
        default: 0
    },
    username:{
        type: String,
    }
},{
    timestamps: true
})

recipeSchema.index({
    "$**": "text"
})

module.exports = mongoose.model('Recipe', recipeSchema)