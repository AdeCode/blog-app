const mongoose = require('mongoose')
const Schema = mongoose.Schema
const validator = require('validator')
const bcrypt = require('bcrypt')

const userSchema = new Schema({
    email:{
        type: String,
        required:[true, 'email is required'],
        unique: true
    },
    firstName:{
        type: String,
        required:[true, 'first name is required'],
    },
    lastName:{
        type: String,
        required:[true, 'last name is required'],
    },
    password:{
        type: String,
        required:[true, 'password is required'],
    }
}, {timestamps:true})


const User = mongoose.model('User', userSchema)
module.exports = User