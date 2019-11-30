const express = require('express')

const isAuth = require('../middleware/is-auth')

const router = express.Router()

const accessController = require('../controllers/access')

// POST /access 
router.post('/', accessController.login)

//PUT /access/:employeeId
router.put('/:employeeId', isAuth, accessController.changePassword)

module.exports = router