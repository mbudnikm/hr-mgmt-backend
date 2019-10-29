const express = require('express')
const { body } = require('express-validator/check')

const isAuth = require('../middleware/is-auth')

const router = express.Router()

const accessController = require('../controllers/access')

router.post('/', accessController.login)
router.put('/:employeeId', isAuth, accessController.changePassword)

module.exports = router