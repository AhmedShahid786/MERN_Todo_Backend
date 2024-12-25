# Backend Project

This repository contains the backend for an application built with Node.js. It includes features such as user authentication, task management, input validation, MongoDB CRUD operations, JWT-based authentication, and password hashing with bcrypt for a seamless and secure experience.

## File Structure

```
├── helpers/
│   └── sendResponse.js        # Utility for sending standardized responses
├── middleware/
│   └── authenticate.js        # Middleware for authentication handling
├── models/
│   ├── task.js                # Mongoose schema for tasks
│   └── user.js                # Mongoose schema for users
├── routers/
│   ├── auth.js                # Routes for authentication
│   ├── tasks.js               # Routes for task management
│   └── users.js               # Routes for user management
├── validation/
│   └── schemas.js             # Validation schemas using Joi or similar libraries
├── .env                       # Environment variables
├── .gitignore                 # Files and directories to be ignored by Git
├── .render.yaml               # Configuration for deployment on Render
├── index.js                   # Entry point for the application
├── package.json               # Project metadata and dependencies
├── package-lock.json          # Lock file for exact dependency versions
└── README.md                  # Project documentation
```

## Features

- **Authentication**: Secure user login and registration handled via middleware and dedicated routes.
- **Task Management**: APIs for creating, updating, deleting, and retrieving tasks.
- **Validation**: Input validation using a robust schema to ensure error-free functionality.
- **MongoDB CRUD Operations**: Efficient database operations for managing users and tasks.
- **JWT Authentication**: Securely handles user sessions with JSON Web Tokens.
- **Password Hashing**: Ensures password security using bcrypt.
- **Error Handling**: Standardized response structure for consistent API behavior.

## Technologies Used

- **Node.js**: Runtime environment
- **Express.js**: Web framework
- **Mongoose**: MongoDB object modeling for Node.js
- **Joi**: Data validation library
- **dotenv**: For environment variable management
- **bcrypt**: For password hashing
- **jsonwebtoken (JWT)**: For secure authentication

## Installation

### Prerequisites

Ensure you have the following installed:

- Node.js
- npm
- MongoDB

### Steps to Set Up Locally

1. Clone the repository:

   ```bash
   git clone <repository_url>
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   - Create a `.env` file in the root directory.
   - Define the necessary variables such as:
     ```
     MONGO_URI=<your_mongo_database_url>
     JWT_SECRET=<your_jwt_secret>
     ```

4. Start the development server:
   ```bash
   npm start
   ```

The server will run on `http://localhost:3000` by default.

## Deployment

This project is configured for deployment on Render. Follow these steps:

1. Push your code to a GitHub repository.
2. Log in to your Render account and create a new web service.
3. Link the repository and set up the environment variables in the Render dashboard.
4. Deploy the service, and Render will handle the rest.

Refer to `.render.yaml` for additional configuration details.

## API Documentation

### Authentication

- **POST /auth/register**

  - Registers a new user.
  - Example request:
    ```json
    {
      "success": true,
      "msg": "User registered successfully.",
      "data": {
        "email": "John@email.com",
        "password": "$2b$10$eJXLcuCuAjyClzCmHrlRcOOnRyexnLrazeLYyGcOjjr2mpLtdbi4i",
        "fullname": "John Doe",
        "_id": "676c474468f8b6a379067106c",
        "__v": 0
      }
    }
    ```

- **POST /auth/login**
  - Logs in an existing user.
  - Example request:
    ```json
    {
      "success": true,
      "msg": "User logged in successfully.",
      "data": {
        "user": {
          "_id": "123a8aea6ad349a8bba28d12",
          "email": "John@gmail.com",
          "password": "$2b$10$51rs5YBzgpL1vUwFD0Rlh.qVO/JVe0p9KpjdaKV1cI3oAGpMJKsaW",
          "fullname": "John Doe",
          "__v": 0
        },
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzZhOGFlYTZhZDMyOWE4YmJhMjhkOTYiLCJlbWFpbCI6ImFobWVkMUBnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCQ1MXJzNVlCemdwTDF2VXdGRDBSbGgucVZPL0pWZTBwOUtwamRhS1YxY0kzb0FHcE1KS3NhVyIsImZ1bGxuYW1lIjoiQWhtZWQgUmF6YSBTaGFoaWQiLCJfX3YiOjAsImlhdCI6MTczNTEabcd5Mn0.Z62GV3OUT_1fM2fBZaRaoFGySUR6K2SKukXrQUt7lKE"
      }
    }
    ```

### Users

- **GET /users/:id**
  - Fetch a specific user by ID.
  - Example request:
  ```json
  {
    "success": true,
    "msg": "User data fetched from db.",
    "data": {
      "_id": "676a8aea6ad312a8bba12d12",
      "email": "John@gmail.com",
      "password": "$2b$199h1rs5YBzgpL1vUwFD0Rlh.qVO/JVe0p9KpjdaKV1cI3oAGpMJKsaW",
      "fullname": "John Doe",
      "__v": 0
    }
  }
  ```

### Tasks

- **GET /tasks**
- Example request:

```json
{
    "success": true,
    "msg": "Tasks fetched successfully.",
    "data": [
        {
            "_id": "676ac0123fc5f8adca52ea5e",
            "title": "First task",
            "description": "No Description.",
            "createdBy": "6123aea6ad329a8bba28d96",
            "isCompleted": false,
            "createdAt": "2024-12-24T14:10:18.613Z",
            "updatedAt": "2024-12-25T12:47:09.544Z",
            "__v": 0
        }
        {
            "_id": "676ac0123fc5f8adca52ea5e",
            "title": "Second task",
            "description": "No Description.",
            "createdBy": "6123aea6ad329a8bba28d96",
            "isCompleted": false,
            "createdAt": "2024-12-24T14:10:18.613Z",
            "updatedAt": "2024-12-25T12:47:09.544Z",
            "__v": 0
        }
    ]
}
```

- Fetch all tasks.

- **POST /tasks**

  - Create a new task.
  - Example request:
    ```json
    {
      "success": true,
      "msg": "Task added successfully.",
      "data": {
        "title": "First Task",
        "description": "This is the first task.",
        "createdBy": "676a8aea6ad329a8bba1226",
        "isCompleted": false,
        "_id": "676c45c58feb6a37906712345",
        "createdAt": "2024-12-25T17:49:57.378Z",
        "updatedAt": "2024-12-25T17:49:57.378Z",
        "__v": 0
      }
    }
    ```

- **PUT /tasks/:id**

  - Update a task by ID.
  - Example request

  ````json
  {
    "success": true,
    "msg": "Task updated successfully.",
    "data": {
        "_id": "676a8d3e67ea8b9239704123",
        "title": "First Task",
        "description": "This is the first task.",
        "createdBy": "676a8aea6ad329a8bba21234",
        "isCompleted": true,
        "createdAt": "2024-12-24T10:30:22.472Z",
        "updatedAt": "2024-12-25T12:07:41.744Z",
        "__v": 0
    }
  }
    ```

  ````

- **DELETE /tasks/:id**
  - Delete a task by ID.
  - Example request
  ````json
  {
    "success": true,
    "msg": "Task deleted successfully.",
    "data": {
        "_id": "676a8d2467ea8b923912344a",
        "title": "First Task",
        "description": "This is my First Task",
        "createdBy": "676a8aea6ad32123bba28d96",
        "isCompleted": false,
        "createdAt": "2024-12-24T10:29:56.507Z",
        "updatedAt": "2024-12-24T10:29:56.507Z",
        "__v": 0
    }
  }
    ```
  ````
