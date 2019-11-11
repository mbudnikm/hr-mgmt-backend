const express = require('express')

const assessmentController = require('../controllers/assessment')

const isAuth = require('../middleware/is-auth')

const router = express.Router()

// GET /assessments/:employeeId
router.get('/:employeeId', isAuth, assessmentController.getEmployeeAssessments)

// POST /assessments
router.post('/assessments', isAuth, assessmentController.postAssessment)

// DELETE /assessments/:assessmentId
router.delete('/:assessmentId', isAuth, assessmentController.deleteAssessment)

module.exports = router