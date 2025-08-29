const request = require('supertest')
const sinon = require('sinon')
const { expect } = require('chai')

const app = require('../../app')

const authSetupFile = require('../authSetup')

const transferService = require('../../service/transferService')

describe('transferController', () => {

    describe('POST /tranfer', () => {

        /*
        let token

        beforeEach(async () => {
            const loginResponse = await request(app)
                .post('/login')
                .send({
                    "username": "Hyui",
                    "password": "1234"
                })
            this.token = loginResponse.body.token
        })
        */

        it('Deve retorna 400 caso sender or recipient does not exist', async () => {
            const resposta = await request(app)
                .post('/transfer')
                .set('Authorization', `Bearer ${authSetupFile.getToken()}`)
                .send({
                    "from": "Faraó",
                    "to": "Yugi",
                    "value": 10000
                })
            expect(resposta.body).to.have.property('error', 'Sender or recipient does not exist')
        })

        it('Usando Mocks: Deve retorna 400 caso sender or recipient does not exist', async () => {

            const transferServiceMock = sinon.stub(transferService, 'transfer')
            transferServiceMock.throws(new Error('Sender or recipient does not exist'))

            const resposta = await request(app)
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

        it('Deve retorna 200 caso dados corretos', async () => {

            const resposta = await request(app)
                .post('/transfer')
                .set('Authorization', `Bearer ${authSetupFile.getToken()}`)
                .send({
                    "from": "Hyui",
                    "to": "Jiroy",
                    "value": 10000
                })

            expect(resposta.status).to.equal(201)

            const transferSucessResponse = require('../../fixture/responses/transferSucessResponse.json')
            delete resposta.body.date
            delete transferSucessResponse.date
            expect(resposta.body).to.deep.equal(transferSucessResponse) // or to.eql
 
        })
    })

    afterEach(async () => {
        sinon.restore()
    })
})