
const chai = require('chai');
const {expect} = chai;
const isValidEmployee = require('../../api/validations/employee');

describe('Validation Functions', () => {
    describe('isValidEmployee', () => {
        it('call isValidEmployee function with unknow action', () => {  
            let callFunction = isValidEmployee('{}','xpto');
            expect(callFunction.status).to.be.equals('error');
            expect(callFunction.error).to.be.equals('nothing to do without action xpto');
        });
    }); 
});
