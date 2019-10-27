const mongoose = require('mongoose')
const Schema = mongoose.Schema

const addressSchema = new Schema({
    postcode: {
        type: Number,
        default: null
    },
    city: {
        type: String,
        default: null
    },
    street: {
        type: String,
        default: null
    },
})

module.exports = addressSchema