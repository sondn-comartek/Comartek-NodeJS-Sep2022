const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email: {
        type: String
    },
    password: {
        type: String
    },
    passwordConfirm: {
        type: String
    }
})

const User = mongoose.model('User', userSchema)
module.exports = User