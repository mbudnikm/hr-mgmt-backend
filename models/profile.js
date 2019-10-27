const mongoose = require('mongoose')
const Schema = mongoose.Schema

const profileSchema = new Schema({
    manager_id: {
        type: Number,
        required: true
    },
    job_position: {
        type: String,
        default: null
    },
    img: {
        type: String,
        default: '../images/default_avatar.png'
    }
})

module.exports = profileSchema