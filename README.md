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

## GraphQL API

### Setup
1. Install dependencies:
    ```sh
    npm install
    ```
2. Start the GraphQL server:
    ```sh
    node graphql/server.js
    ```
3. Access GraphQL Playground at [http://localhost:4000/graphql](http://localhost:4000/graphql)

### Usage
- Use the Playground to run queries and mutations:
   - `register`: Register a new user
   - `login`: Get JWT token for authentication
   - `user`: Query user info
   - `transfer`: Make a transfer (requires JWT)

#### Example Mutation for Login
```graphql
mutation {
   login(username: "youruser", password: "yourpass") {
      token
      user {
         username
         favorecido
      }
   }
}
```

#### Example Mutation for Transfer (with JWT)
1. Get token from login mutation
2. In Playground, click HTTP Headers and add:
```json
{
   "Authorization": "Bearer <your_token>"
}
```
3. Run transfer mutation:
```graphql
mutation {
   transfer(from: "youruser", to: "recipient", value: 100.0) {
      from
      to
      value
      date
   }
}
```

### Testing
You can import `graphql/app.js` in your test files (e.g., with Supertest) to test the API without starting the server.
