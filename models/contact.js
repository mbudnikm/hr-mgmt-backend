const mongoose = require('mongoose')
const Schema = mongoose.Schema

const contactSchema = new Schema({
    email: {
        type: String,
        default: null
    },
    business_tel: {
        type: String,
        default: null
    },
    private_tel: {
        type: String,
        default: null
    }
})

module.exports = contactSchema