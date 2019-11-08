const express = require('express')

const employeeController = require('../controllers/employee')

const isAuth = require('../middleware/is-auth')

const router = express.Router()

// GET /employees/:managerId
router.get('/:managerId', isAuth, employeeController.getManagerEmployees)


module.exports = router