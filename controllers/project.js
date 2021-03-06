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

exports.putProject = (req, res, next) => {
    const projectId = req.params.projectId
    const project_name = req.body.project_name
    const project_description = req.body.project_description
    const project_start_date = req.body.project_start_date
    const project_end_date = req.body.project_end_date
    const project_comments = req.body.project_comments
    const employees = req.body.employees
    const updatedProject = {
        project_name: project_name,
        project_description: project_description,
        project_start_date: project_start_date,
        project_end_date: project_end_date,
        project_comments: project_comments,
        employees: employees
    }
    Project
        .findOneAndUpdate(
            {_id: projectId},
            updatedProject,
            {new: true})
        .catch(err => {
            if(!err.statusCode) {
                err.statusCode = 500
            }
            next(err)
        })
}

exports.postProject = (req, res, next) => {
    const project_name = req.body.project_name
    const project_description = req.body.project_description
    const project_start_date = req.body.project_start_date
    const project_end_date = req.body.project_end_date
    const project_comments = req.body.project_comments
    const employees = req.body.employees

    const project = new Project({
        project_name: project_name,
        project_description: project_description,
        project_start_date: project_start_date,
        project_end_date: project_end_date,
        project_comments: project_comments,
        employees: employees
    })

    project
        .save()
        .then(result => {
            res.status(201).json({
                message: "Projekt został dodany poprawnie",
                project: result
            })
        })
        .catch(err => {
            if(!err.statusCode) {
                err.statusCode = 500
                err.message = "Coś poszło nie tak! Projekt nie został dodany"
            }
            next(err)
        })
}

exports.deleteProject = (req, res, next) => {
    const projectId = req.params.productId;
    Project.findByIdAndRemove(projectId)
        .then(result => {
            res.status(200).json({
                message: "Projekt został usunięty",
            })
        })
        .catch(err => {
            if(!err.statusCode) {
                err.statusCode = 500
            }
            next(err)
        })
}