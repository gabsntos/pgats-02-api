const fs = require('fs');
const path = require('path');
const request = require('supertest');
const app = require('../app');

const userFile = path.join(__dirname, '../.auth/user.json');

async function authenticate() {
	const loginResponse = await request(app)
		.post('/login')
		.send({
			username: 'Hyui',
			password: '1234'
		});
	const token = loginResponse.body.token;
	fs.writeFileSync(userFile, JSON.stringify({ token }, null, 2));
	return token;
}

let token;
before(async function() {
	token = await authenticate();
});

module.exports = {
	getToken: () => {
		if (!token) {
			const data = JSON.parse(fs.readFileSync(userFile));
			return data.token;
		}
		return token;
	}
};
const authFile = require('../.auth/user.json')