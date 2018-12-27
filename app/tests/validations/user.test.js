
const chai = require('chai');
const {expect} = chai;
const isValidUser = require('../../api/validations/user');

describe('Validation Functions', () => {
    describe('isValidUser', () => {
        it('call isValidUser function with unknow action', () => {  
            let callFunction = isValidUser('{}','xpto');
            expect(callFunction.status).to.be.equals('error');
            expect(callFunction.error).to.be.equals('nothing to do without action xpto');
        });
    }); 
});
