const express = require('express')

const projectController = require('../controllers/project')

const isAuth = require('../middleware/is-auth')

const router = express.Router()

// GET /projects
router.get('/', isAuth, projectController.getProjects)

module.exports = router