## API responsible for CRUD to employees and users

[Demo](http://ec2-3-16-29-88.us-east-2.compute.amazonaws.com:3001/api/employees/)

### OPERATION

This API uses databases not relacional (MongoDB) to save the documents sended, we have one basic and simple auth middleware in the routes interaction to employees document.

### VALIDATIONS

To validate payloads sended we have onde validation using Jsonschema in the process to create and update employee and users, this method try reduced risks to index invalid documents in database.

### TESTS

To run unit test we can use `npm run test` and `npm run coverage`

### CODE STYLE

To validate syntax and correctly spacement or other abnormalities from code writer use `npm run lint .`

### TO RUN PROJECT

Thats project was projected using docker

To run the projeto execute `docker-compose up` in root folder from project

### MODELS
All used models stay in api/models folder. We have two models:
    - user -> Model responsible to define the contract for users documents
    - employee -> Model responsible to define the contract for employees documents

Employee
```
const employeeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    participation: { type: Number, required: true },
    createdAt: { type: Date, required: false },
    updatedAt: { type: Date, required: false }
});
```
User
```
const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,    
    username: { type: String, required: true , unique: true},
    password: { type: String, required: true, select: false }
});
```

### ROUTES
All routes stay in api/routes folder. We have two routes:

- `/api/users`
    - Routes responsible to interacte from user models.
    - Methods allowed (GET, POST, PUT, DELETE)
- `/api/employees`
    - Routes responsible to interacte from employee models.
    - To access thats routes POST, PUT, DELETE you has to pass with parameter three arguments.(token, user, password)
    - Methods allowed (GET, POST, PUT, DELETE)

#### ROUTE USERS

#### GET `/api/users`

![get user](/docs/images/get-user.gif "GET User example")

This route return all users registered in database

response example:
```json
[
    {
        "_id": "5c23865dc74f8c0030d21ecf",
        "username": "admins",
        "__v": 0
    },
    {
        "_id": "5c23865dc74f8c0030d21ec3",
        "username": "admin2",
        "__v": 0
    }
]
```

is possible filter from username, use query in url to use this.

url example:
http://localhost:3001/api/users/?username=admins


response example:
```json
[
    {
        "_id": "5c23865dc74f8c0030d21ecf",
        "username": "admins",
        "__v": 0
    }
]
```

#### GET `/api/users/:id`

This route return one user filtered by id registered in database

GET `/api/users/5c23865dc74f8c0030d21ecf`

response example:
```json
{
    "_id": "5c23865dc74f8c0030d21ecf",
    "username": "admins",
    "__v": 0
}
```

#### POST `/api/users/`

![post user](/docs/images/post-user.gif "POST User example")

This route register one user in database and given one token available from next 24 hours to access `api/employees` route
Is expected two parameters in payload, username and password. Remembering that the user is unique in the base.

POST `/api/users/`

example payload :
```json
{
    "username": "admin",
    "password": "123"
}
```

In case off success in you will have a response with token from that user.
example:
```json
{
    "message": "User created",
    "result": {
        "_id": "5c23d92c41abcd00314cffeb",
        "username": "admin",
        "password": "$2a$08$hhRdtKfRBIdJ8WErLQ4tWOBq.gapRM7ugx72JBk7grKjUWDGOi1lm",
        "__v": 0
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjMjNkOTJjNDFhYmNkMDAzMTRjZmZlYiIsImlhdCI6MTU0NTg1MzIyOCwiZXhwIjoxNTQ1ODU2ODI4fQ.GjDBJLphblGp-IBKjDttHxOI0A5u2uDUniqrwkkmhuE"
}
```
In case off not success in you will have a response with error.
example:
```json
{
    "error": "User already exists"
}
```

#### PUT `/api/users/:id`

![put user](/docs/images/put-user.gif "PUT User example")

This route updated the register from one user in database and given token refreshed available from next 24 hours to access `api/employees` route
Is expected five parameters in payload, username, password, newUsername, newPassword, _id.
You can change username and password, but for this you need pass yout actual password and actual user.

- newUsername = new password,
- username = actual username,
- newPassword = new password,
- password = actual username,
- _id = id from user

PUT `/api/users/5c23865dc74f8c0030d21ecf`

example payload :
```json
{
    "newUsername": "NEW NAME" ,
    "username": "ACTUAL NAME",
    "newPassword": "NEW PASSWORD",
    "password": "ACTUAL PASSWORD",
    "_id": "5c23d92c41abcd00314cffeb"
}
```

In case off success in you will have a response with token refreshed from that user.
example:
```json
{
    "message": "Updated",
    "newToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjMjM4NjVkYzc0ZjhjMDAzMGQyMWVjZiIsImlhdCI6MTU0NTg0NTI0MiwiZXhwIjoxNTQ1ODQ4ODQyfQ.UVpeckE7lZ7KJHbct7YJid46VFHADLRtEEovjaS__P0"
}
```
In case off not success in you will have a response with error.
example:
```json
{
    "error": "invalid credentials"
}
```
*If you change only name, then you make the request passing the `newPassword`the same value from actual `password`

#### DELETE `/api/users/:id`

![delete user](/docs/images/delete-user.gif "DELETE User example")

This route return one user filtered by id registered in database

DELETE `/api/users/5c23865dc74f8c0030d21ecf`

response example:
```json
{
    "message": "Deleted"
}
```

#### ROUTE EMPLOYEE

In routes method PUT, POST, DELETE relateds to employees has a step to authorization with bearer mode, and simple password and user validation, then in requests to this routes you step send in `headers` off the request three parameters.

- "username": "admin", -> Username accredited user.
- "password": "1234", -> Password accredited user.
- "Authorization": "Bearer XPTO" -> Token created in insertion or update from one user.

*to get this token go to [HOW TO GET TOKEN](#HOW-TO-GET-TOKEN)

#### GET `/api/employees`

![get employee](/docs/images/get-employee.gif "GET employee")

This route return all employees registered in database.
To access this route you have to be a valid and accredited user.

payload example sended:

```json
{
  "method": "GET",
  "hostname": [
    "localhost"
  ],
  "port": "3001",
  "path": [
    "api",
    "employees"
  ]
};  
```

response example:
```json
[
    {
        "_id": "5c1d26c5c51b4a00317bd994",
        "firstName": "Matheus",
        "lastName": "geiger",
        "participation": 9,
        "createdAt": "2018-12-21T17:45:41.185Z",
        "__v": 0
    },
    {
        "_id": "5c23b506e1b9ab00315a794b",
        "firstName": "matheus 2",
        "lastName": "geiger 2",
        "participation": 10,
        "createdAt": "2018-12-26T17:06:14.646Z",
        "__v": 0
    }
]
```
is possible filter from firstName, use query in url to use this.

url example:
http://localhost:3001/api/users/?firstName=matheus


response example:
```json
[
    {
        "_id": "5c1d26c5c51b4a00317bd994",
        "firstName": "Matheus",
        "lastName": "geiger",
        "participation": 9,
        "createdAt": "2018-12-21T17:45:41.185Z",
        "__v": 0
    },
]
```

#### GET `/api/employees/:id`

This route return one employee filtered by id registered in database

GET `/api/employees/5c1d26c5c51b4a00317bd994`

payload example sended:

```json
{
  "method": "GET",
  "hostname": [
    "localhost"
  ],
  "port": "3001",
  "path": [
    "api",
    "employees",
    "5c1d26c5c51b4a00317bd994"
  ]
};
```

response example:

```json
{
    "_id": "5c1d26c5c51b4a00317bd994",
    "firstName": "Matheus",
    "lastName": "geiger",
    "participation": 9,
    "createdAt": "2018-12-21T17:45:41.185Z",
    "__v": 0
}
```

#### POST `/api/employees/`

![post employee](/docs/images/post-employee.gif "POST employee")

This route register one employee in database.
On body request you has to pass the parameters relative from employee model (firstName, lastName, participation)

- firstName -> first name to employee
- lastName -> last name to employee
- participation -> number type related from the participation from employee

POST `/api/employees/`

example payload :
```json
{
  "method": "POST",
  "hostname": [
    "localhost"
  ],
  "port": "3001",
  "path": [
    "api",
    "employees"
  ],
  "headers": {
    "password": "1234",
    "username": "admin",
    "Authorization": "Bearer XPTO",
  },
  "body": { 
    "firstName": "matheus", 
    "lastName": "geiger", 
    "participation": 10 
  },
};
```

In case off success in you will have a response with user _id and details.
example:
```json
{
    "message": "Employee created",
    "result": {
        "_id": "5c24c577c5bbdb004565895c",
        "firstName": "matheus 2",
        "lastName": "geiger 2",
        "participation": 10,
        "createdAt": "2018-12-27T12:28:39.353Z",
        "__v": 0
    }
}
```
In case off not success in you will have a response with error.
example:
```json
{
    "auth": false,
    "message": "Invalid credentials"
}
```

#### PUT `/api/employees/:id`

![put employee](/docs/images/put-employee.gif "PUT employee")

This route updated the register from one employee in database.
Is expected four parameters in payload(firstName, lastName, participation, newPassword, _id)
You can change the values from employee.

- firstName -> first name to employee
- lastName -> last name to employee
- participation -> number type related from the participation from employee
- _id -> id from employee

PUT `/api/users/employees/5c24c577c5bbdb004565895c`

example payload :
```json
{
  "method": "POST",
  "hostname": [
    "localhost"
  ],
  "port": "3001",
  "path": [
    "api",
    "employees",
    "5c24c577c5bbdb004565895c"
  ],
  "headers": {
    "password": "1234",
    "username": "admin",
    "Authorization": "Bearer XPTO",
  },
  "body": { 
    "firstName": "matheus", 
    "lastName": "geiger", 
    "participation": 10,
    "_id": "5c24c577c5bbdb004565895c"
  },
};
```

In case off success.
example:
```json
{
    "message": "Updated"
}
```

In case off not success.
example:
```json
{
    "auth": false,
    "message": "Invalid credentials"
}
```

#### DELETE `/api/employees/:id`

![delete employee](/docs/images/delete-employee.gif "DELETE employee")

This route return one employee filtered by id registered in database

DELETE `/api/employees/5c24c577c5bbdb004565895c`

response example:
```json
{
    "message": "Deleted"
}
```

### HOW TO GET TOKEN

![token](/docs/images/put-user.gif "Token")

To make the requests from `api/employee` routes you need one user accredited and token.

When you create ou update a user using the route `api/users/` with POST and PUT method the token is returned in response to your request.

example:
```json
{
    "message": "User created",
    "result": {
        "_id": "5c23d92c41abcd00314cffeb",
        "username": "admin",
        "password": "$2a$08$hhRdtKfRBIdJ8WErLQ4tWOBq.gapRM7ugx72JBk7grKjUWDGOi1lm",
        "__v": 0
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjMjNkOTJjNDFhYmNkMDAzMTRjZmZlYiIsImlhdCI6MTU0NTg1MzIyOCwiZXhwIjoxNTQ1ODU2ODI4fQ.GjDBJLphblGp-IBKjDttHxOI0A5u2uDUniqrwkkmhuE"
}
```
