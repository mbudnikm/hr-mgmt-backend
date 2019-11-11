const express = require('express')

const trainingController = require('../controllers/training')

const isAuth = require('../middleware/is-auth')

const router = express.Router()

// GET /trainings/:employeeId
router.get('/:employeeId', isAuth, trainingController.getEmployeeTrainings)

// PUT /trainings/:trainingId
router.put('/:trainingId', isAuth, trainingController.putTraining)

// POST /trainings
router.post('/', isAuth, trainingController.postTraining)

// DELETE /trainings/:trainingId
router.delete('/:trainingId', isAuth, trainingController.deleteTraining)

module.exports = router 