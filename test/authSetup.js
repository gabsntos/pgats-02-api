const fs = require('fs'); // Node.js built-in module for file system operations (reading/writing files)
const path = require('path'); // Node.js built-in module for handling file and directory paths
const request = require('supertest'); // Supertest is used for making HTTP requests to our Express app in tests
const app = require('../app'); // Import the Express app to send requests to it

const authDir = path.join(__dirname, '../.auth');
const userFile = path.join(__dirname, '../.auth/user.json'); // Path to the file where we'll store the authentication token

// Create .auth directory if it doesn't exist
if (!fs.existsSync(authDir)) {
  fs.mkdirSync(authDir);
}

// Create user.json if it doesn't exist
if (!fs.existsSync(userFile)) {
  fs.writeFileSync(userFile, '{}');
}

// Function to perform login and save the token to userFile
async function authenticate() {
	const loginResponse = await request(app)
		.post('/login')
		.send({
			username: 'Hyui',
			password: '1234'
		});
	// Extract the token from the response
	const token = loginResponse.body.token;
	// Save the token to .auth/user.json for sharing across tests
	fs.writeFileSync(userFile, JSON.stringify({ token }, null, 2));
	return token;
}

// Variable to hold the token in memory during the test run
let token;
// Mocha hook that runs once before all tests to perform authentication
before(async function() {
	token = await authenticate();
});

// Export a function to get the token, either from memory or from the file
module.exports = {
	getToken: () => {
		// If token is not in memory, read it from the file
		if (!token) {
			const data = JSON.parse(fs.readFileSync(userFile));
			return data.token;
		}
		// Otherwise, return the in-memory token
		return token;
	}
};