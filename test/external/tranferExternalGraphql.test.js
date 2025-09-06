const request = require('supertest')
const { expect } = require('chai')
const { response } = require('../../app')
const { login } = require('../../controller/userController')

beforeEach(async () => {
    const login = await request('http://localhost:4000')
        .post('/graphql')
        .send({
            query: `
                    mutation LoginUser($username: String!, $password: String!) { 
                        loginUser(username: $username, password: $password) { 
                            token 
                        }
                    }`,
            variable: {
                username: 'Hyui',
                password: '1234'
            }
        })
    token = login.body.data.loginUser.token
})

describe('transferExternalGrapghql', () => {

    it.only('insuficient available balance', async () => {
        const transferResponse = await request('http://localhost:4000')
            .post('/graphql')
            .send('Authorization', `Bearer ${token}`)
            .send({
                query: `
                    mutation CreateTransfer($from: String!, $to: String!, $value: Float!) { 
                        createTransfer(from: $from, to: $to, value: $value) { 
                            from
                            to
                            value
                        }
                    }`,
                variable: {
                    from: 'Hyui',
                    to: 'Jiroy',
                    value: '10000'
                }
            })
    })
})