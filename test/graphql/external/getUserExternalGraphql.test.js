const request = require('supertest')
const { expect } = require('chai')
require('dotenv').config()

describe('getUserExternalGraphql', () => {

    const getUserErrors = require('../fixture/requests/getUserWithError.json')

    getUserErrors.forEach(test => {
        it(`${test.testName}`, async () => {
            const getUserResponse = await request(process.env.GRAPHQL_URL)
                .post('/graphql')
                .send({
                    query: `
                        query Users($username: String!) {
                            users(username: $username) {
                                username
                                password
                                favorecido
                            }
                        }`,
                    variables: test.variables
                })
            expect(getUserResponse.body.errors[0].message).to.equal(test.expectedErrorMessage)
        })
    })
})
