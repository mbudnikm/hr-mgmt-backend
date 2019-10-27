const mongoose = require('mongoose')
const Schema = mongoose.Schema

const documentSchema = new Schema({
    role_id: {
        type: String,
    },
    file_name: {
        type: String,
    },
    path: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Document', documentSchema)