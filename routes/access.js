const express = require('express')
const { body } = require('express-validator/check')
const bcrypt = require('bcryptjs')

const router = express.Router()

const accessController = require('../controllers/access')

router.post('/', accessController.login)

module.exports = router