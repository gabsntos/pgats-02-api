const request = require('supertest')
const { expect } = require('chai')

const authSetupFile = require('../../authSetup')

describe('transferExternal', () => {
    describe('POST /transfer', () => {
        it('should return 400 BAD REQUEST when sender or recipient does not exist', async () => {
            const resposta = await request('http://localhost:3000')
                .post('/transfer')
                .set('Authorization', `Bearer ${authSetupFile.getToken()}`)
                .send({
                    "from": "Gabriel",
                    "to": "Wanderson",
                    "value": 10000
                })
                expect(resposta.status).to.equal(400)
                expect(resposta.body).to.have.property('error', 'Sender or recipient does not exist')
        })

        it('should return 201 CREATED when user input is valid', async () => {

            const resposta = await request('http://localhost:3000')
                .post('/transfer')
                .set('Authorization', `Bearer ${authSetupFile.getToken()}`)
                .send({
                    "from": "Hyui",
                    "to": "Jiroy",
                    "value": 10000
                })

            expect(resposta.status).to.equal(201)

            const transferSucessResponse = require('../../../fixture/responses/transferSucessResponse.json')
            delete resposta.body.date
            delete transferSucessResponse.date
            expect(resposta.body).to.deep.equal(transferSucessResponse) // or to.eql
        })
    })
})