# Uber Clone – Ride Booking Platform

**Live Link:** 

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)


## Overview

This Uber Clone is a fully functional ride-booking platform inspired by real-world ride-hailing services. Built with the powerful MERN Stack, integrated with real-time communication via Socket.io, and enhanced with interactive mapping using Leaflet, it provides a seamless user and captain experience.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User & Captain Authentication:** Role-based sign-up, login, JWT authentication, and secure access control for users and captains.
- **Real-Time Ride Tracking:** Using Socket.io to establish real-time connections for live ride updates, including ride status, captain location, and OTP-based ride start.
- **Dynamic Map Integration:** Leaflet is used for displaying and interacting with maps, showing routes, captain locations, and ride destinations in real-time.
- **Ride Lifecycle Management:** Full ride flow: Create ride → Calculate fare → Captain confirmation → OTP verification → Start/End ride.
- **Captain Vehicle Info & Availability:** Captains register with vehicle details and are shown in real-time to users when searching for nearby rides.
- **Distance & Time Calculation:** Uses mapping APIs to calculate estimated fare, distance, and time between two geolocations.

## Technologies Used

- **MongoDB:** NoSQL database for storing user, captain, and ride data.
- **Express.js:** Backend API built with RESTful structure and validation.
- **React.js:** Front-end UI with reusable components and real-time updates.
- **Node.js:** Server runtime to handle business logic and connections.
- **Socket.io:** Enables real-time communication between users and captains for ride updates.
- **Leaflet.js:** Interactive mapping to visualize pickups, drop-offs, and captain movements.
- **JWT (JSON Web Tokens):** Secure token-based authentication for sessions.


## Project Setup

### Getting Started

Follow the steps below to set up and run the application on your local machine:

1. **Clone the Repository**

```bash
git clone https://github.com/Avijit200318/Uber-Clone.git
```

2. **Add all the .env variables**
- Make sure to update the values (like API keys, Mongo URI, etc.) inside both .env files according to .env.txt file local setup or environment.

3. **Install and Start Backend**
```bash
npm install
npm run dev
```

This starts the backend server on http://localhost:4000

4. **Install and Start Frontend**
```bash
cd Frontend
npm install
npm run dev
```
This starts the frontend server on http://localhost:5173

⚠️ Make sure your backend server is running before launching the frontend.



## Usage

### For Users:

1. **Sign Up / Login** as a user.
2. **Create Ride** by selecting pickup and destination locations.
3. **Get Fare Estimate** and wait for a captain to confirm.
4. **Verify OTP** shared by the captain before starting the ride.
5. **Track Ride** in real-time until it’s completed.

### For Captains:

1. **Sign Up / Login** with vehicle details.
2. **See New Ride Requests** in real-time via Socket.io.
3. **Confirm Ride** and reach the pickup point.
4. **Start Ride** after OTP verification and **End Ride** upon completion.

## Contributing

Contributions are welcome! Whether you're fixing a bug, enhancing features, or suggesting improvements, feel free to submit a pull request or open an issue.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for full details.

