var Validator = require('jsonschema').Validator;
var schemaValidate = new Validator();

const jsonAdd = require('./schemas/user/add_user_json_schema.js')();
const jsonUpdate = require('./schemas/user/update_user_json_schema.js')();

function validateSchemaAdd(objectUser){
    
    let schemaValidation = schemaValidate.validate(objectUser, jsonAdd);
    
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

function validateSchemaUpdate(objectUser){

    let schemaValidation = schemaValidate.validate(objectUser, jsonUpdate);
    
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

function isValidUser(fieldsValues, action) {
    
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

module.exports = isValidUser;
