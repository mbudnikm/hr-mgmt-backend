const express = require('express')

const archiveController = require('../controllers/archive')

const isAuth = require('../middleware/is-auth')

const router = express.Router()

// GET /archive
router.get('/', isAuth, archiveController.getArchive)

// POST /archive
router.post('/', isAuth, archiveController.postArchive)

// DELETE /archive/:employeeId
router.delete('/:employeeId', isAuth, archiveController.deleteArchive)

module.exports = router