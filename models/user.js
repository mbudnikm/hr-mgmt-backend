const mongoose = require('mongoose')
const Schema = mongoose.Schema
const autoIncrement = require('mongoose-auto-increment')

const connection = mongoose.createConnection("mongodb+srv://app:app@hr-zgxte.mongodb.net/mgmt?retryWrites=true&w=majority")

autoIncrement.initialize(connection)

const userSchema = new Schema({
    employee_id: {
        type: Number,
        required: true,
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    role_id: {
        type: String,
        required: true
    },
    pesel: {
        type: Number,
        required: true
    }
}, { timestamps: true })

userSchema.plugin(autoIncrement.plugin, {
    model: 'User',
    field: 'employee_id',
    incrementBy: 1
})

module.exports = mongoose.model('User', userSchema)