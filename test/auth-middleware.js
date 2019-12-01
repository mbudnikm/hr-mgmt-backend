const expect = require('chai').expect
const jwt = require('jsonwebtoken')
const sinon = require('sinon')

const authMiddleware = require('../middleware/is-auth')

describe('Auth Middelware', () => {
    it('should throw an error if no authorization header is present', () => {
        const req = {
            get: () => {
                return null;
            }
        }
        expect(authMiddleware.bind(this, req, {}, () => {})).to.throw('Not authenticated.')
    })
    
    it('should throw an error if the authorization header is only one string ', () => {
        const req = {
            get: () => {
                return '123';
            }
        }
        expect(authMiddleware.bind(this, req, {}, () => {})).to.throw('Not authenticated')
    });

    it('should yield an employee_id after decoding the token', () => {
        const req = {
            get: () => {
                return '123';
            }
        }
        sinon.stub(jwt, 'verify')
        jwt.verify.returns({
            employee_id: 1
        })
        authMiddleware(req, {}, () => {})
        expect(req).to.have.property('employee_id')
        expect(req).to.have.property('employee_id', 1)
        expect(jwt.verify.called).to.be.true
        jwt.verify.restore()
    });

    it("should throw an error if the token can't be verified", () => {
        const req = {
            get: () => {
                return '123';
            }
        }
        expect(authMiddleware.bind(this, req, {}, () => {})).to.throw()
    });
});