# Overview
This Uber Clone is a fully functional ride-booking platform inspired by real-world ride-hailing services. Built with the powerful MERN Stack, integrated with real-time communication via Socket.io, and enhanced with interactive mapping using Leaflet, it provides a seamless user and captain experience.

# ER Diagram
<img width="4465" height="2962" alt="diagram-export-8-12-2025-9_49_34-PM" src="https://github.com/user-attachments/assets/e349f092-771f-4802-9520-23897f587359" />

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

## Endpoint: `/users/login`

### Description
This endpoint is used to log in an existing user. It validates the input data, checks the user's credentials, and returns a JSON Web Token (JWT) along with the user data.

### Method
`POST`

### Request Body
The request body should be a JSON object with the following fields:
- `email`: A valid email address (required)
- `password`: A string with a minimum length of 6 characters (required)

Example:
```json
{
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
## Endpoint: `/users/profile`

### Description
This endpoint is used to get the profile of the authenticated user.

### Method
`GET`

### Headers
- `Authorization`: Bearer token (required)

### Example Response
The response will be a JSON object containing the user data:
- `_id`: The user's unique identifier
- `fullName`: An object containing:
  - `firstName`: The user's first name
  - `lastName`: The user's last name
- `email`: The user's email address

Example:
```json
{
  "_id": "user_id_here",
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "john.doe@example.com"
}
```

## Endpoint: `/users/logout`

### Description
This endpoint is used to log out the authenticated user. It clears the authentication token from the cookies and adds the token to a blacklist.

### Method
`GET`

### Headers
- `Authorization`: Bearer token (required) or cookie token required

### Example Response
The response will be a JSON object with a message indicating successful logout.

Example:
```json
{
  "message": "Logged Out Successfully"
}
```

## Endpoint: `/captains/signUp`

### Description
This endpoint is used to register a new captain. It validates the input data, hashes the password, creates a new captain in the database, and returns a JSON Web Token (JWT) along with the captain data.

### Method
`POST`

### Request Body
The request body should be a JSON object with the following fields:
- `fullName`: An object containing:
  - `firstName`: A string with a minimum length of 3 characters (required)
  - `lastName`: A string with a minimum length of 3 characters (optional)
- `email`: A valid email address (required)
- `password`: A string with a minimum length of 6 characters (required)
- `vehicle`: An object containing:
  - `color`: A string with a minimum length of 3 characters (required)
  - `plate`: A string with a minimum length of 3 characters (required)
  - `capacity`: An integer with a minimum value of 1 (required)
  - `vehicleType`: A string that must be one of `car`, `bike`, or `auto` (required)

Example:
```json
{
  "fullName": {
    "firstName": "Jane",
    "lastName": "Doe"
  },
  "email": "jane.doe@example.com",
  "password": "password123",
  "vehicle": {
    "color": "red",
    "plate": "ABC123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

### Example Response
The response will be a JSON object with the following fields:
- `token`: A JSON Web Token (JWT) for authentication
- `captain`: An object containing the captain data:
  - `_id`: The captain's unique identifier
  - `fullName`: An object containing:
    - `firstName`: The captain's first name
    - `lastName`: The captain's last name
  - `email`: The captain's email address
  - `vehicle`: An object containing:
    - `color`: The vehicle's color
    - `plate`: The vehicle's plate
    - `capacity`: The vehicle's capacity
    - `vehicleType`: The vehicle's type

Example:
```json
{
  "token": "your_jwt_token_here",
  "captain": {
    "_id": "captain_id_here",
    "fullName": {
      "firstName": "Jane",
      "lastName": "Doe"
    },
    "email": "jane.doe@example.com",
    "vehicle": {
      "color": "red",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
}
```

## Endpoint: `/captains/login`

### Description
This endpoint is used to log in an existing captain. It validates the input data, checks the captain's credentials, and returns a JSON Web Token (JWT) along with the captain data.

### Method
`POST`

### Request Body
The request body should be a JSON object with the following fields:
- `email`: A valid email address (required)
- `password`: A string with a minimum length of 6 characters (required)

Example:
```json
{
  "email": "jane.doe@example.com",
  "password": "password123"
}
```

### Example Response
The response will be a JSON object with the following fields:
- `token`: A JSON Web Token (JWT) for authentication
- `captain`: An object containing the captain data:
  - `_id`: The captain's unique identifier
  - `fullName`: An object containing:
    - `firstName`: The captain's first name
    - `lastName`: The captain's last name
  - `email`: The captain's email address
  - `vehicle`: An object containing:
    - `color`: The vehicle's color
    - `plate`: The vehicle's plate
    - `capacity`: The vehicle's capacity
    - `vehicleType`: The vehicle's type

Example:
```json
{
  "token": "your_jwt_token_here",
  "captain": {
    "_id": "captain_id_here",
    "fullName": {
      "firstName": "Jane",
      "lastName": "Doe"
    },
    "email": "jane.doe@example.com",
    "vehicle": {
      "color": "red",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
}
```

## Endpoint: `/captains/profile`

### Description
This endpoint is used to get the profile of the authenticated captain.

### Method
`GET`

### Headers
- `Authorization`: Bearer token (required)

### Example Response
The response will be a JSON object containing the captain data:
- `_id`: The captain's unique identifier
- `fullName`: An object containing:
  - `firstName`: The captain's first name
  - `lastName`: The captain's last name
- `email`: The captain's email address
- `vehicle`: An object containing:
  - `color`: The vehicle's color
  - `plate`: The vehicle's plate
  - `capacity`: The vehicle's capacity
  - `vehicleType`: The vehicle's type

Example:
```json
{
  "_id": "captain_id_here",
  "fullName": {
    "firstName": "Jane",
    "lastName": "Doe"
  },
  "email": "jane.doe@example.com",
  "vehicle": {
    "color": "red",
    "plate": "ABC123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

## Endpoint: `/captains/logout`

### Description
This endpoint is used to log out the authenticated captain. It clears the authentication token from the cookies and adds the token to a blacklist.

### Method
`GET`

### Headers
- `Authorization`: Bearer token (required) or cookie token required

### Example Response
The response will be a JSON object with a message indicating successful logout.

Example:
```json
{
  "message": "Logout successfully"
}
```


# Ride API Endpoints

---

## Endpoint: `/ride/create`

### Description
This endpoint is used to create a new ride request. The user must provide pickup and destination locations along with the preferred vehicle type.

### Method
`POST`

### Headers
- `Authorization`: Bearer token (User, required)

### Request Body
```json
{
  "pickup": { "lat": 22.5726, "lng": 88.3639 },
  "destination": { "lat": 22.5800, "lng": 88.3700 },
  "vehicleType": "car",
  "pickupLocation": { "ltd": 22.5726, "lng": 88.3639 }
}
```

### Example Response
```json
{
  "_id": "ride_id_here",
  "user": { /* user info */ },
  "pickup": { /* coordinates */ },
  "destination": { /* coordinates */ },
  "vehicleType": "car",
  "distance": 5,
  "duration": 12
}

```
## Endpoint: `/ride/get-fare`

### Description
This endpoint calculates the estimated fare based on the pickup and destination.

### Method
`POST`

### Headers
- `Authorization`: Bearer token (User, required)

### Request Body
```json
{
  "pickup": { "lat": 22.5726, "lng": 88.3639 },
  "destination": { "lat": 22.5800, "lng": 88.3700 }
}
```

### Example Response
```json
{
  "fare": 120,
  "distance": 5,
  "duration": 12
}

```
## Endpoint: `/ride/confirm`

### Description
This endpoint is used by the captain to confirm a ride request.

### Method
`POST`

### Headers
- `Authorization`: Bearer token (Captain, required)

### Request Body
```json
{
  "rideId": "ride_id_here",
  "captainId": "captain_id_here"
}
```

### Example Response
```json
{
  "_id": "ride_id_here",
  "status": "confirmed",
  "captain": "captain_id_here"
}
```
## Endpoint: `/ride/start-ride`

### Description
This endpoint is used by the captain to start a ride after verifying the ride OTP.

### Method
`GET`

### Headers
- `Authorization`: Bearer token (Captain, required)

### Query Parameters
- `rideId`: A valid ride ID (required)
- `otp`:  A string OTP (required)

### Example Bash
```json
/ride/start-ride?rideId=ride_id_here&otp=1234

```

### Example Response
```json
{
  "_id": "ride_id_here",
  "status": "started"
}

```
## Endpoint: `/ride/end-ride`

### Description
This endpoint is used by the captain to end the ride.

### Method
`POST`

### Headers
- `Authorization`: Bearer token (Captain, required)

### Example Body
```json
{
  "rideId": "ride_id_here"
}
```

### Example Response
```json
{
  "_id": "ride_id_here",
  "status": "completed"
}
```

# Maps API Endpoints

## Endpoint: `/maps/get-coordinates`

### Description
This endpoint is used to retrieve the geographical coordinates (latitude and longitude) of a provided address.

### Method
`GET`

### Headers
- `Authorization`: Bearer token (User required)

### Query Parameters
- `address:` A valid address string (required)

### Example Bash
```json
/maps/get-coordinates?address=Kolkata

```

### Example Response
```json
{
  "lat": 22.5726,
  "lng": 88.3639
}
```
## Endpoint: `/maps/get-distance-time`

### Description
This endpoint is used to calculate the distance and estimated travel time between two addresses.

### Method
`GET`

### Headers
- `Authorization`: Bearer token (User or Captain, required)

### Query Parameters
- `origin:` Starting address (required)

- `destination:` Destination address (required)

### Example Bash
```json
/maps/get-distance-time?origin=Kolkata&destination=Howrah
```
### Example Response
```json
{
  "distance": {
    "text": "6.5 km",
    "value": 6500
  },
  "duration": {
    "text": "15 mins",
    "value": 900
  }
}
```
