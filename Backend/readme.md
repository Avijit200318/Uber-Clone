# API Documentation

## Endpoint: `/users/signUp`

### Description
This endpoint is used to register a new user. It validates the input data, hashes the password, creates a new user in the database, and returns a JSON Web Token (JWT) along with the user data.

### Method
`POST`

### Request Body
The request body should be a JSON object with the following fields:
- `fullName`: An object containing:
  - `firstName`: A string with a minimum length of 3 characters (required)
  - `lastName`: A string with a minimum length of 3 characters (optional)
- `email`: A valid email address (required)
- `password`: A string with a minimum length of 6 characters (required)

Example:
```json
{
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}
```

### Example Response
The response will be a JSON object with the following fields:
- `token`: A JSON Web Token (JWT) for authentication
- `user`: An object containing the user data:
  - `_id`: The user's unique identifier
  - `fullName`: An object containing:
    - `firstName`: The user's first name
    - `lastName`: The user's last name
  - `email`: The user's email address

Example:
```json
{
  "token": "your_jwt_token_here",
  "user": {
    "_id": "user_id_here",
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```