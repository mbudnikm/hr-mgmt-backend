const Archive = require('../models/archive')

exports.getArchive = (req, res, next) => {
    Archive
        .find()
        .then(result => {
            res.status(200).json({archive: result})
        })
        .catch(err => {
            if(!err.statusCode) {
                err.statusCode = 500
            }
            next(err)
        })
};