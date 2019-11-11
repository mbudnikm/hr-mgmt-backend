const expect = require('chai').expect
const sinon = require('sinon')

const Access = require('../models/access')
const AccessController = require('../controllers/access')

describe('Access Controller - Login', () => {
    it('should throw an error with code 500 if accessing the database fails', (done) => {
        sinon.stub(Access, 'findOne');
        Access.findOne.throws();

        const req = {
        body: {
            employee_id: 11,
            password: 'test'
        }
        };

        AccessController.login(req, {}, () => {}).then(result => {
            expect(result).to.be.an('Error');
            expect(result).to.have.property('statusCode', 500);
            done();
        });

        Access.findOne.restore();
    });
});