const express = require('express')

const projectController = require('../controllers/project')

const isAuth = require('../middleware/is-auth')

const router = express.Router()

// GET /projects
router.get('/', isAuth, projectController.getProjects)

// PUT /projects/:projectId
router.put('/:projectId', isAuth, projectController.putProject)

// POST /projects
router.post('/', isAuth, projectController.postProject)

// DELETE /projects/:projectId
router.delete('/:projectId', isAuth, projectController.deleteProject)

module.exports = router