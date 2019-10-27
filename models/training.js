const mongoose = require('mongoose')
const Schema = mongoose.Schema

const trainingSchema = new Schema({
    employee_id: {
        type: Number,
        required: true
    },
    training_name: {
        type: String,
        required: true
    },
    training_status: {
        type: String,
    },
    training_date: {
        type: Date,
    },
    training_cost: {
        type: String,
    },
    training_comments: {
        type: String
    }
})

module.exports = mongoose.model('Training', trainingSchema)