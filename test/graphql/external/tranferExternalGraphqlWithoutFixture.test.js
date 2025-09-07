const request = require('supertest')
const { expect } = require('chai')

describe('transferExternalGrapghqlWithoutFixture', () => {

    beforeEach(async () => {
        const loginRequest = require('../fixture/requests/userLogin.json')
        const loginResponse = await request('http://localhost:4000')
            .post('/graphql')
            .send({
                query: `mutation LoginUser($username: String!, $password: String!) {
                loginUser(username: $username, password: $password) {
                    token
                }
            }`,
                variables: {
                    username: 'Hyui',
                    password: '1234'
                }
            })
        token = loginResponse.body.data.loginUser.token
    })

    it('should successfully transfer between two user accounts', async () => {
        const transferResponse = await request('http://localhost:4000')
            .post('/graphql')
            .set('Authorization', `Bearer ${token}`)
            .send({
                query: `
                    mutation CreateTransfer($from: String!, $to: String!, $value: Float!) { 
                        createTransfer(from: $from, to: $to, value: $value) { 
                            from
                            to
                            value
                            date
                        }
                    }`,
                variables: {
                    from: 'Hyui',
                    to: 'Jiroy',
                    value: 10000
                }
            })
        const transferSucessResponseModel = require('../fixture/responses/transferSucessResponseGraphql.json')
        delete transferResponse.body.data.createTransfer.date
        delete transferSucessResponseModel.data.createTransfer.date
        expect(transferResponse.body).to.eql(transferSucessResponseModel) // or to.eql
    })

    it('insuficient balance', async () => {
        const transferResponse = await request('http://localhost:4000')
            .post('/graphql')
            .set('Authorization', `Bearer ${token}`)
            .send({
                query: `
                    mutation CreateTransfer($from: String!, $to: String!, $value: Float!) { 
                        createTransfer(from: $from, to: $to, value: $value) { 
                            from
                            to
                            value
                            date
                        }
                    }`,
                variables: {
                    from: 'Hyui',
                    to: 'Jiroy',
                    value: 10000.1
                }
            })
        expect(transferResponse.body.errors[0].message).to.equal('Saldo insuficiente')
    })
})