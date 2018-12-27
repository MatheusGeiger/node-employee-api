var Validator = require('jsonschema').Validator;
var schemaValidate = new Validator();

const jsonAdd = require('./schemas/employee/add_employee_json_schema.js')();
const jsonUpdate = require('./schemas/employee/update_employee_json_schema.js')();

function validateSchemaAdd(objectEmployee){
    
    let schemaValidation = schemaValidate.validate(objectEmployee, jsonAdd);
    
    if (schemaValidation.valid){
        return {status:'success'};
    }else{
        console.log(`invalid schema ${JSON.stringify(schemaValidation.errors)}`);
        return {
            status: 'error',
            error: JSON.stringify(schemaValidation.errors)
        };
    }
}

function validateSchemaUpdate(objectEmployee){

    let schemaValidation = schemaValidate.validate(objectEmployee, jsonUpdate);
    
    if (schemaValidation.valid){
        return {status:'success'};
    }else{
        console.log(`invalid schema ${JSON.stringify(schemaValidation.errors)}`);
        return {
            status: 'error',
            error: JSON.stringify(schemaValidation.errors)
        };
    }
}

function isValidEmployee(fieldsValues, action) {
    
    let objValidation = '';

    if (action == 'add'){
        objValidation = validateSchemaAdd(fieldsValues);
        if (objValidation.status === 'error'){
            console.log(`invalid schema ${JSON.stringify(objValidation.error)}`);
            return objValidation;
        }else {
            return {status:'success'};
        }
    }else{
        if (action == 'update'){
            objValidation = validateSchemaUpdate(fieldsValues);
            if (objValidation.status === 'error'){
                console.log(`invalid schema ${JSON.stringify(objValidation.error)}`);
                return objValidation;
            }else {
                return {status:'success'};
            }
        }else{
            console.log(`nothing to do without action ${action}`);
            return {
                status: 'error',
                error: `nothing to do without action ${action}`
            };
        }
    }
}

module.exports = isValidEmployee;
