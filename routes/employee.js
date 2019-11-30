const express = require('express')

const employeeController = require('../controllers/employee')

const isAuth = require('../middleware/is-auth')

const router = express.Router()

// GET /employees/all/:managerId
router.get('/all/:managerId', isAuth, employeeController.getManagerEmployees)

// GET /employees/:employeeId
router.get('/:employeeId', isAuth, employeeController.getEmployee)

// PUT /employees/:employeeId
router.put('/:employeeId', isAuth, employeeController.putEmployee)

module.exports = router