const fs = require('fs')
const fileHelper = require('../util/file')

const Document = require('../models/document')

exports.getDocumentsList = (req, res, next) => {
    Document
        .find()
        .then(result => {
            res.status(200).json({documents: result.map(el =>({
                _id: el._id,
                file_name: el.file_name
            }))})
        })
        .catch(err => {
            if(!err.statusCode) {
                err.statusCode = 500
            }
            next(err)
        })
};

exports.getDocument = (req, res, next) => {
    const documentId = req.params.documentId
    let invoiceName;
    Document
        .findById(documentId)
        .then(result => {
            invoiceName = result.path;
            // FILE READ
            /*fs.readFile(invoiceName, (err, data) => {
                if(err) {
                    return next(err)
                }
                res.setHeader('Content-Type', 'application/pdf')
                res.setHeader('Content-Disposition', 'attachment; filename="' + invoiceName + '"')
                res.send(data)
            })*/

            // FILE STREAM
            const file = fs.createReadStream(invoiceName)
            res.setHeader('Content-Type', 'application/pdf')
            res.setHeader('Content-Disposition', 'attachment; filename="' + invoiceName + '"')
            res.pipe(res)
        })
        .catch(err => {
            if(!err.statusCode) {
                err.statusCode = 500
            }
            next(err)
        })
}

exports.postDocument = (req, res, next) => {
    if(!req.file) {
        const error = new Error("Nie załadowano pliku")
        error.statusCode = 422
        throw error
    }

    const role_id = req.body.role_id
    const file_name = req.body.file_name
    const path = req.file.path.replace("\\","/");

    const newDocument = new Document({
        role_id: role_id,
        file_name: file_name,
        path: path
    })

    newDocument
        .save()
        .then(result => {
            res.status(201).json({
                message: "Dokument został dodany",
                document: result
            })
        })
        .catch(err => {
            if(!err.statusCode) {
                err.statusCode = 500
            }
            next(err)
        })
}

exports.deleteDocument = (req, res, next) => {
    const documentId = req.params.documentId;

    Document.findByIdAndRemove(documentId)
        .then(result => {
            if(!result) {
                return next(new Error("Nie znaleziono dokumentu"))
            }
            fileHelper.deleteFile(result.path)
            res.status(200).json({
                message: "Dokument został usunięty",
            })
        })
        .catch(err => {
            if(!err.statusCode) {
                err.statusCode = 500
            }
            next(err)
        })
}