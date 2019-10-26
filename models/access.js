const mongoose = require('mongoose')
const Schema = mongoose.Schema
const autoIncrement = require('mongoose-auto-increment')

const connection = mongoose.createConnection("mongodb+srv://app:app@hr-zgxte.mongodb.net/mgmt?retryWrites=true&w=majority")

autoIncrement.initialize(connection)

const accessSchema = new Schema({
    employee_id: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        required: true
    }
})


accessSchema.plugin(autoIncrement.plugin, {
    model: 'Access',
    field: 'employee_id',
    startAt: 1,
    incrementBy: 1
})

module.exports = mongoose.model('Access', accessSchema, "access")