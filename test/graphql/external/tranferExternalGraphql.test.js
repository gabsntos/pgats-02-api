const request = require('supertest')
const { expect, use } = require('chai')
require('dotenv').config()

const chaiExclude = require('chai-exclude');
use(chaiExclude);

describe('transferExternalGrapghql', () => {

    beforeEach(async () => {
        const loginRequest = require('../fixture/requests/userLogin.json')
        const loginResponse = await request(process.env.GRAPHQL_URL)
            .post('/graphql')
            .send(loginRequest)
        token = loginResponse.body.data.loginUser.token
    })

    it('should successfully transfer between two user accounts', async () => {
        const transferRequest = require('../fixture/requests/transferMutation.json')
        const transferResponse = await request(process.env.GRAPHQL_URL)
            .post('/graphql')
            .set('Authorization', `Bearer ${token}`)
            .send(transferRequest)
        const transferSucessResponseModel = require('../fixture/responses/transferSucessResponseGraphql.json')
        expect(transferResponse.body.data.createTransfer)
            .excluding('date')
            .to.eql(transferSucessResponseModel.data.createTransfer)
        
    })

    it('insuficient balance', async () => {
        const transferRequest = require('../fixture/requests/transferMutation.json')
        transferRequest.variables.value = 10000.01
        const transferResponse = await request(process.env.GRAPHQL_URL)
            .post('/graphql')
            .set('Authorization', `Bearer ${token}`)
            .send(transferRequest)
        expect(transferResponse.body.errors[0].message).to.equal('Saldo insuficiente')
    })
})