const express = require('express')

const documentController = require('../controllers/document')

const isAuth = require('../middleware/is-auth')

const router = express.Router()

// GET /documents
router.get('/', isAuth, documentController.getDocumentsList)

// GET /documents/:documentId
router.get('/:documentId', isAuth, documentController.getDocument)

// POST /documents
router.post('/', isAuth, documentController.postDocument)

// DELETE /documents/:documentId
router.delete('/:documentId', isAuth, documentController.deleteDocument)

module.exports = router