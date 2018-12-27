const chai = require('chai');
const { expect } = chai;
const sinon = require('sinon');
const _ = require('lodash');
const proxyQuire = require('proxyquire');
const sandbox = sinon.createSandbox();
const statusStub = sandbox.stub();
const jsonStub = sandbox.stub();
const saveStub = sandbox.stub();
const findStub = sandbox.stub();
const findOneStub = sandbox.stub();
const updateStub = sandbox.stub();
const deleteStub = sandbox.stub();
const removeStub = sandbox.stub();
const thenStub = sandbox.stub();
const execStub = sandbox.stub();
const sortStub = sandbox.stub();

const EmployeeController = proxyQuire('../../api/controllers/employee', {
    '../models/employee': function () {
        this.find = findStub;
        this.findOne = findOneStub;
        this.save = saveStub;
        this.update = updateStub;
        this.delete = deleteStub;
    }
});


describe('Employee', () => {
    afterEach(() => sandbox.reset());
    describe('create', () => {
        it('should return status 201, \
            message Employee created and result object', async () => {

            statusStub.returns({ json: jsonStub });
            saveStub.resolves('result');

            let req = {
                headers: {
                    Authorization: 'Bearer TOKEN_STRING'
                },
                body: {
                    firstName: 'Name',
                    lastName: 'lastName',
                    participation: 9
                }
            };

            let res = {
                status: statusStub
            };

            let next = sandbox.stub();
            await EmployeeController.create(req, res, next);

            expect(statusStub.calledWith(201)).to.equal(true);
            expect(statusStub.callCount).to.be.equal(1);

            expect(jsonStub.calledWith({
                message: 'Employee created',
                result: 'result'
            })).to.equal(true);
            expect(jsonStub.callCount).to.be.equal(1);
        });

        it('should return status 500 and error message', async () => {

            statusStub.returns({ json: jsonStub });
            saveStub.returns({ then: thenStub });
            thenStub.rejects(new Error('error'));

            let req = {
                headers: {
                    'x-access-token': 'TOKEN_STRING'
                },
                body: {
                    firstName: 'Name',
                    lastName: 'lastName',
                    participation: 9
                }
            };

            let res = {
                status: statusStub
            };

            let next = sandbox.stub();
            await EmployeeController.create(req, res, next);

            expect(statusStub.calledWith(500)).to.equal(true);
            expect(jsonStub.calledWith(sinon.match(a => {
                return _.isEqual(a, { error: new Error('error') });
            }))).to.equal(true);
        });

        it('should return status 400 and error message', async () => {

            statusStub.returns({ json: jsonStub });

            let req = {
                headers: {
                    'x-access-token': 'TOKEN_STRING'
                },
                body: {
                    firstName: '',
                    lastName: 'lastName',
                    participation: 9
                }
            };

            let res = {
                status: statusStub
            };

            let next = sandbox.stub();
            await EmployeeController.create(req, res, next);

            expect(statusStub.calledWith(400)).to.equal(true);
            expect(jsonStub.returned()).to.equal(true);
        });
    });

    describe('findEmployees', () => {

        const EmployeeController = proxyQuire('../../api/controllers/employee', {
            '../models/employee': {
                find: findStub,
                findOne: findOneStub
            }
        });

        it('should return status 200 and result object', async () => {

            statusStub.returns({ json: jsonStub });
            findStub.returns({ exec: execStub });
            execStub.resolves('employees');

            let req = {
                query: {}
            };

            let res = {
                status: statusStub
            };

            let next = sandbox.stub();
            await EmployeeController.findEmployees(req, res, next);

            expect(statusStub.calledWith(200)).to.equals(true);
            expect(jsonStub.calledWith('employees')).to.equals(true);
        });


        it('should return status 200 with title and result object', async () => {

            statusStub.returns({ json: jsonStub });
            findStub.returns({ sort: sortStub });
            sortStub.returns({ exec: execStub });
            execStub.returns({ then: thenStub });
            execStub.resolves('employees');

            let req = {
                query: {
                    firstName: 'oi'
                }
            };

            let res = {
                status: statusStub
            };

            let next = sandbox.stub();
            await EmployeeController.findEmployees(req, res, next);

            expect(sortStub.callCount).to.be.equal(1);
            expect(statusStub.calledWith(200)).to.equals(true);
            expect(jsonStub.calledWith('employees')).to.equals(true);
        });

        it('should return status 200 with id and result object', async () => {

            statusStub.returns({ json: jsonStub });
            findOneStub.returns({ exec: execStub });
            execStub.returns({ then: thenStub });
            execStub.resolves('employees');

            let req = {
                params: 'id'
            };

            let res = {
                status: statusStub
            };

            let next = sandbox.stub();
            await EmployeeController.findEmployeeById(req, res, next);

            expect(findOneStub.callCount).to.be.equal(1);
            expect(statusStub.calledWith(200)).to.equals(true);
            expect(jsonStub.calledWith('employees')).to.equals(true);
        });

        it('should return status 500 with id and error message', async () => {

            statusStub.returns({ json: jsonStub });
            findOneStub.returns({ exec: execStub });
            execStub.returns({ then: thenStub });
            thenStub.rejects(new Error('error'));

            let req = {
                params: 'id'
            };

            let res = {
                status: statusStub
            };

            let next = sandbox.stub();
            await EmployeeController.findEmployeeById(req, res, next);

            expect(findOneStub.callCount).to.be.equal(1);
            expect(statusStub.calledWith(500)).to.be.equal(true);
            expect(jsonStub.calledWith(sinon.match(a => {
                return _.isEqual(a, { error: new Error('error') });
            }))).to.equal(true);
        });

        it('should return status 500 and error message', async () => {

            statusStub.returns({ json: jsonStub });
            findStub.returns({ exec: execStub });
            execStub.returns({ then: thenStub });
            thenStub.rejects(new Error('error'));

            let req = {
                query: {},
            };

            let res = {
                status: statusStub
            };

            let next = sandbox.stub();
            await EmployeeController.findEmployees(req, res, next);

            expect(statusStub.calledWith(500)).to.be.equal(true);
            expect(jsonStub.calledWith(sinon.match(a => {
                return _.isEqual(a, { error: new Error('error') });
            }))).to.equal(true);
        });

        it('should return status 500 with title and error message', async () => {

            statusStub.returns({ json: jsonStub });
            findStub.returns({ sort: sortStub });
            sortStub.returns({ exec: execStub });
            execStub.returns({ then: thenStub });
            thenStub.rejects(new Error('error'));

            let req = {
                query: {
                    firstName: 'oi'
                },
            };

            let res = {
                status: statusStub
            };

            let next = sandbox.stub();
            await EmployeeController.findEmployees(req, res, next);

            expect(sortStub.callCount).to.be.equal(1);
            expect(statusStub.calledWith(500)).to.be.equal(true);
            expect(jsonStub.calledWith(sinon.match(a => {
                return _.isEqual(a, { error: new Error('error') });
            }))).to.equal(true);
        });
    });

    describe('update', () => {

        const EmployeeController = proxyQuire('../../api/controllers/employee', {
            '../models/employee': {
                updateOne: updateStub
            }
        });

        it('should return status 200 and result object', async () => {

            statusStub.returns({ json: jsonStub });
            updateStub.resolves();

            let req = {
                headers: {
                    'x-access-token': 'TOKEN_STRING'
                },
                body: {
                    _id: 'has121a',
                    firstName: 'changed FirstName',
                    lastName: 'changed LastName',
                    participation: 10
                },
                params: {
                    id: 'id'
                }
            };

            let res = {
                status: statusStub
            };

            let next = sandbox.stub();
            await EmployeeController.update(req, res, next);

            expect(statusStub.calledWith(202)).to.be.equal(true);
            expect(jsonStub.calledWith({ message: 'Updated' })).to.equal(true);
        });

        it('should return status 500 and error message', async () => {

            statusStub.returns({ json: jsonStub });
            updateStub.returns({ then: thenStub });
            thenStub.rejects(new Error('error'));

            let req = {
                headers: {
                    'x-access-token': 'TOKEN_STRING'
                },
                body: {
                    _id: 'has121a',
                    firstName: 'changed FirstName',
                    lastName: 'changed LastName',
                    participation: 10
                },
                params: {
                    id: 'id'
                }
            };

            let res = {
                status: statusStub
            };

            let next = sandbox.stub();
            await EmployeeController.update(req, res, next);

            expect(statusStub.calledWith(500)).to.be.equal(true);
            expect(jsonStub.calledWith(sinon.match(a => {
                return _.isEqual(a, { error: new Error('error') });
            }))).to.equal(true);
        });

        it('should return status 400 and error message', async () => {

            statusStub.returns({ json: jsonStub });

            let req = {
                headers: {
                    'x-access-token': 'TOKEN_STRING'
                },
                body: {
                    _id: '',
                    firstName: 'changed FirstName',
                    lastName: 'changed LastName',
                    participation: 10
                },
            };

            let res = {
                status: statusStub
            };

            let next = sandbox.stub();
            await EmployeeController.update(req, res, next);

            expect(statusStub.calledWith(400)).to.equal(true);
            expect(jsonStub.returned()).to.equal(true);
        });
    });

    describe('delete', () => {

        const EmployeeController = proxyQuire('../../api/controllers/employee', {
            '../models/employee': {
                delete: deleteStub,
                find: findStub,
                remove: removeStub,
                exec: execStub,
                then: thenStub
            }
        });

        it('should return status 202 and result object', async () => {

            statusStub.returns({ json: jsonStub });
            findStub.returns({ remove: removeStub });
            removeStub.returns({ exec: execStub });
            execStub.resolves('success');

            let req = {
                headers: {
                    'x-access-token': 'TOKEN_STRING'
                },
                params: {
                    id: 'id'
                }
            };

            let res = {
                status: statusStub
            };

            let next = sandbox.stub();
            await EmployeeController.delete(req, res, next);

            expect(statusStub.calledWith(202)).to.be.equal(true);
            expect(removeStub.callCount).to.be.equal(1);
            expect(jsonStub.calledWith({ message: 'Deleted' })).to.equal(true);
        });

        it('should return status 500 and error message', async () => {

            statusStub.returns({ json: jsonStub });
            findStub.returns({ remove: removeStub });
            removeStub.returns({ exec: execStub });
            execStub.returns({ then: thenStub });
            thenStub.rejects(new Error('error'));

            let req = {
                headers: {
                    'x-access-token': 'TOKEN_STRING'
                },
                params: {
                    id: 'id'
                }
            };

            let res = {
                status: statusStub
            };

            let next = sandbox.stub();
            await EmployeeController.delete(req, res, next);

            expect(statusStub.calledWith(500)).to.be.equal(true);
            expect(removeStub.callCount).to.be.equal(1);
            expect(jsonStub.calledWith(sinon.match(a => {
                return _.isEqual(a, { error: new Error('error') });
            }))).to.equal(true);
        });
    });
});
