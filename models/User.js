const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    joinDate:{
        type: Date,
        default: Date.now
    },
    favorites:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Recipe'
    }
},{
    timestamps: true
})

userSchema.pre('save', function(next){

    if(!this.isModified('password')){
        next()
    }
    bcrypt.genSalt(10, (err, salt) => {
        if(err) return next(err)

        bcrypt.hash(this.password, salt, (err, hash) => {
            if(err) return next(err)

            this.password = hash
            next()
        })
    })
    
})

module.exports = mongoose.model('User', userSchema)