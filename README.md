# API Test Automation Service

This project is a simple REST API built with Express for user registration, login, user consultation, and value transfer. It is designed for API testing and learning purposes, with an in-memory database and Swagger documentation.

## Features
- Register new users (with unique username)
- Login with username and password
- Consult user data
- Transfer values between users, with business rules:
  - Login and password are required
  - Cannot register the same user twice
  - Transfer above R$ 5.000,00 only allowed to recipients marked as `favorecido`

## Project Structure
- `controller/` - Route handlers
- `service/` - Business logic
- `model/` - In-memory data storage
- `app.js` - Express app (for testing)
- `server.js` - Starts the server
- `swagger.json` - Swagger API documentation

## Setup
1. Install dependencies:
   ```sh
   npm install
   ```
2. Start the server:
   ```sh
   node server.js
   ```
3. Access Swagger docs at [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

## API Endpoints
See Swagger documentation at `/api-docs` for details.

## Testing
You can import `app.js` in your test files (e.g., with Supertest) to test the API without starting the server.
