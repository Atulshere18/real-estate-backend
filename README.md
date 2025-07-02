Real Estate Backend

Overview

This is the backend application for the Real Estate platform, developed with Node.js and Express. It manages data storage, user authentication, and property management functionalities.

Features

Authentication: Secure JWT-based login and signup system.

Property Management: Create, update, delete, and retrieve properties.

Middleware: Route protection and input validation.

Database Integration: MongoDB (via Mongoose) to store user and property data.

Error Handling: Structured and descriptive error responses.

Tech Stack

Backend: Node.js, Express.js

Database: MongoDB

Authentication: JSON Web Tokens (JWT)

Setup Instructions

1. Clone the Repository

git clone https://github.com/Atulshere18/real-estate-backend.git

2. Navigate to the Project Directory

cd real-estate-backend

3. Install Dependencies

npm install

4. Start the Server

npm start

5. Environment Variables

Create a .env file in the root directory with the following content:

PORT=5000
MONGO_URI=mongodb://localhost:27017/real-estate
JWT_SECRET=your_jwt_secret

API Endpoints

Authentication

POST api/auth/signup: Create a new user account.

POST api/auth/login: Login and receive a JWT token.

Properties

GET api/properties: Retrieve a list of properties (supports search and pagination).

POST api/properties: Add a new property.

PUT api/properties/:id: Update an existing property.

DELETE api/properties/:id: Delete a property.

