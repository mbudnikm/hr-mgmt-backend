const mongoose = require('mongoose')
const Schema = mongoose.Schema

const archiveSchema = new Schema({
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
    }
}, {timestamps: true})

module.exports = mongoose.model('Archive', archiveSchema)