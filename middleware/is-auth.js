const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization')
    if (!authHeader) {
        const error = new Error('Not authenticated.')
        error.statusCode = 401
        throw error
    }
    const token = req.get('Authorization').split(' ')[1]
    let decodedToken
    try {
        decodedToken = jwt.verify(token, 'secret')
    } catch (err) {
        err.statusCode = 500;
        err.message = 'Not authenticated'
        throw err;
    }

    if(!decodedToken) {
        const error = new Error('Not authenticated.')
        error.statusCode = 401;
        throw error
    }
    req.employee_id = decodedToken.employee_id;
    next()
}