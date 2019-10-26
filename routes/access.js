const express = require('express')
const { body } = require('express-validator/check')

const router = express.Router()

const accessController = require('../controllers/access')

/*router.get('/', [

], accessController.signIn)*/

module.exports = router