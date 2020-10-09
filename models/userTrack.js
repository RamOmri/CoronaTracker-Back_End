const Joi = require('joi')
const mongoose = require('mongoose')

const userTrack = mongoose.model('userTrack', new mongoose.Schema ({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }, 
    path: []
    // ,
    // email: {
    //     type: String,
    //     required: true,
    //     minLength: 5,
    //     maxLength: 255,
    // },
 }))

function validatePath(path){
    const schema = {
        userID: Joi.string().required(),
        path: Joi.array().required(),
        // email: Joi.string().min(5).max(255).required()
       }

       return Joi.validate(path, schema)
}

exports.userTrack = userTrack
exports.validatePath = validatePath