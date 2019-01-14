# fancy-todo

## Basic Usage
### 1. Install packages
```
$ npm install
```

### 2. run server
run from server folder
```
$ npm run dev
```
### 3. run live-server
run from client folder
```
$ live-server
```

### 4. home page

```
http://localhost:8080
```
The first page that will appear is login/register form
<br>
then you will redirect to todo page, you can **create, edit, delete** your tado
<br>
<br>
***
***
***
# REST-API 🔥
***
## Register
***
sign up with new user info
1. URL  `http://localhost:3000/register`
2. Method `POST`
3. URL Param `not required`
4. Data Param
```javascript
{
	"name": "anhar",
	"email": "anhar@mail.com",
	"password": "1234",
}

```
5. Success Response
```javascript
CODE : 201 (Created)

CONTENT :
{
  message: "success register, please login to continue"
}
```
6. Error Response
```javascript
CODE: 400

CONTENT:
{
  error,
  message: "error message"
}
```
***
## Sign In Using Email
***
sign in while get an access token based on credentials
1. URL  `localhost:3000/login`
2. Method `POST`
3. URL Param `not required`
4. Data Param
```javascript
{
	"email": "yourmail@mail.com",
	"password": "yourpassword",
}

```
5. Success Response
```javascript
CODE : 200

CONTENT :
{
  token,
  message: "success login"
}
```
6. Error Response
```javascript
CODE: 400

CONTENT:
{
  error,
  message: 'error message'
}
```
***
## Sign In Using Google
***
sign in while get an access token based on credentials
1. URL  `localhost:3000/loginGoogle`
2. Method `POST`
3. URL Param `not required`
4. Data
```javascript
your google account
{
	"email": "yourmail@mail.com",
	"password": "yourpassword",
}

```
5. Success Response
```javascript
CODE : 201

CONTENT :
{
  token,
  message: "success login"
}
```
6. Error Response
```javascript
CODE: 400

CONTENT:
{
  error,
  message: "error message"
}
```

## Create Todo
***
create todo list ( authenticated only )

1. URL  `localhost:3000/todo`
2. Method `POST`
3. URL Param `not required`
4. Data Param
```javascript

data: {
  name : 'todo22', 
  description: 'desc22', 
  dueDate: '01/02/2019',
  
}

headers: {
      'token': <your-token>
    }

```
5. Success Response
```javascript
CODE : 201
{
    "todo": {
        "status": "uncompleted",
        "_id": "5c3b77b67c94fe1966b3d56a",
        "name": "todo22",
        "description": "desc22",
        "due_date": "2019-02-01T00:00:00.000Z",
        "userId": "5c39ae3d5dab367ddf977b94",
        "__v": 0
    },
    "message": "Success create todo"
}
```
6. Error Response
```javascript
CODE: 401 (Unauthorized)
{
  message: "message"
}

CODE: 500
{
  error, message: "internal server error"
}
```
***
## Read Todo
***
show all todo list ( authenticated user only )

1. URL  `localhost:3000/todo`
2. Method `GET`
3. URL Param 
4. Data Param
```javascript
headers: {
      'token': token
    }
```
5. Success Response
```javascript
CODE : 200
show all todo list
array of object
[
  {
    "status": "uncompleted",
    "_id": "5c39aed55dab367ddf977b95",
    "name": "todo1",
    "description": "description1",
    "due_date": "2019-02-01T00:00:00.000Z",
    "userId": "5c39ae3d5dab367ddf977b94",
    "__v": 0
  },
  {
    ...
  }
  ...
]
```
6. Error Response
```javascript
CODE: 401 (Unauthorized)
{
  message: "message"
}

CODE: 500
{
  error, message: "internal server error"
}
```
***
## Read One Todo / Get Details Todo
***
show all todo list ( authenticated user only )

1. URL  `localhost:3000/todo/:todoId`
2. Method `GET`
3. URL Param 
4. Data Param
```javascript
headers: {
      'token': token
    }
```
5. Success Response
```javascript
CODE : 200
  {
    "status": "uncompleted",
    "_id": "5c39aed55dab367ddf977b95",
    "name": "todo1",
    "description": "description1",
    "due_date": "2019-02-01T00:00:00.000Z",
    "userId": "5c39ae3d5dab367ddf977b94",
    "__v": 0
  }
```
6. Error Response
```javascript
CODE: 401 (Unauthorized)
{
  message: "message"
}

CODE: 500
{
  error, message: "internal server error"
}
```
***
## Edit Todo
***
edit todo list ( authenticated user only )
1. URL  `localhost:3000/todo/:todoId`
2. Method `PUT`
3. URL Param `not required`
4. Data Param
```javascript
data: {
    "status": <status>,
    "name": <name>,
    "description": <description1>,
    "due_date": <date>,
    },

headers: {
  'token': token
}
```
5. Success Response
```javascript
CODE : 200
{
  todo: { ... }
  message: "Success edit todo"
}
```
6. Error Response
```javascript
CODE: 401 (Unauthorized)
{
  message: "message"
}

CODE: 500
{
  error, message: "internal server error"
}
```
***
## Delete Todo
***
delete todo list ( authenticated user only )

1. URL  `localhost:3000/todo/:todoId`
2. Method `DELETE`
3. URL Param 
4. Data Param
```javascript
headers: {
      'token': <token>
    }
```
5. Success Response
```javascript
CODE : 200
{
  message: "success delete todo"
}

```
6. Error Response
```javascript
CODE: 401 (Unauthorized)
{
  message: "message"
}

CODE: 500
{
  error, message: "internal server error"
}
```
<br>
<br>

***
## Create Project
***
1. URL  `localhost:3000/projects`
2. Method `POST`
3. URL Param 
4. Data Param
```javascript
headers: {
      'token': <token>
    }
```
5. Success Response
```javascript
CODE : 200
{
  message: ""
}

```
6. Error Response
```javascript
CODE: 401 (Unauthorized)
{
  message: "message"
}

CODE: 500
{
  error, message: "internal server error"
}
```
<br>

***
## Get User Projects
***
1. URL  `localhost:3000/projects`
2. Method `GET`
3. URL Param 
4. Data Param
```javascript
headers: {
      'token': <token>
    }
```
5. Success Response
```javascript
CODE : 200
{
  message: ""
}

```
6. Error Response
```javascript
CODE: 401 (Unauthorized)
{
  message: "message"
}

CODE: 500
{
  error, message: "internal server error"
}
```
<br>

***
## Get Details Project
***
1. URL  `localhost:3000/projects/:projectId`
2. Method `GET`
3. URL Param 
4. Data Param
```javascript
headers: {
      'token': <token>
    }
```
5. Success Response
```javascript
CODE : 200
{
  message: ""
}

```
6. Error Response
```javascript
CODE: 401 (Unauthorized)
{
  message: "message"
}

CODE: 500
{
  error, message: "internal server error"
}
```
<br>

***
## Add Todo to Project
***
1. URL  `localhost:3000/projects/:projectId`
2. Method `POST`
3. URL Param 
4. Data Param
```javascript
data: {
  name:
  description:
  due_date:
}

headers: {
      'token': <token>
    }
```
5. Success Response
```javascript
CODE : 200
{
  message: ""
}

```
6. Error Response
```javascript
CODE: 401 (Unauthorized)
{
  message: "message"
}

CODE: 500
{
  error, message: "internal server error"
}
```
<br>

***
## Edit Todo Project
***
1. URL  `localhost:3000/projects/:projectId/:todoId`
2. Method `PUT`
3. URL Param 
4. Data Param
```javascript
data: {
  name: 
  description:
  due_date:
  status:
}
headers: {
      'token': <token>
    }
```
5. Success Response
```javascript
CODE : 200
{
  message: ""
}

```
6. Error Response
```javascript
CODE: 401 (Unauthorized)
{
  message: "message"
}

CODE: 500
{
  error, message: "internal server error"
}
```
<br>

***
## Delete Todo Project
***
1. URL  `localhost:3000/projects/:projectId/:todoId`
2. Method `DELETE`
3. URL Param 
4. Data Param
```javascript
headers: {
      'token': <token>
    }
```
5. Success Response
```javascript
CODE : 200
{
  message: ""
}

```
6. Error Response
```javascript
CODE: 401 (Unauthorized)
{
  message: "message"
}

CODE: 500
{
  error, message: 'internal server error"
}
```
<br>

***
## Invite Member
***
1. URL  `localhost:3000/projects/:projectId/invite`
2. Method `POST`
3. URL Param 
4. Data Param
```javascript
data: {
  email: "friend's email"
}

headers: {
      'token': <token>
    }
```
5. Success Response
```javascript
CODE : 200
{
  message: "success invite"
}

```
6. Error Response
```javascript
CODE: 401 (Unauthorized)
{
  message: "message"
}

CODE: 500
{
  error, message: 'internal server error"
}
```