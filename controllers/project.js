const Project = require('../models/project')

exports.getProjects = (req, res, next) => {
    Project
        .find()
        .then(projects => {
            res.status(200).json({projects: projects})
        })
        .catch(err => {
            if(!err.statusCode) {
                err.statusCode = 500
            }
            next(err)
        })
};