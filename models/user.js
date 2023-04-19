const mongooes = require('mongoose')

const UserSchema = new mongooes.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String, 
        required: true,
    },
    password: {
        type: String, 
        required: true,
    }
},{
    timestamps: true
})

module.exports = mongooes.model('User',UserSchema)