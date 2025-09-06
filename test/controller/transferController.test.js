const request = require('supertest')
const sinon = require('sinon')
const { expect } = require('chai')

const app = require('../../app')

const authSetupFile = require('../authSetup')

const transferService = require('../../service/transferService')

describe('transferController', () => {

    describe('POST /tranfer', () => {

        it('should return 400 BAD REQUEST when sender or recipient does not exist', async () => {
            const resposta = await request(app)
                .post('/transfer')
                .set('Authorization', `Bearer ${authSetupFile.getToken()}`)
                .send({
                    "from": "Faraó",
                    "to": "Yugi",
                    "value": 10000
                })
            expect(resposta.status).to.equal(400);
            expect(resposta.body).to.have.property('error', 'Sender or recipient does not exist')
        })

        it('using Mocks: should return 400 BAD REQUEST when sender or recipient does not exist', async () => {

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

        it('using Mocks: should return 201 CREATED when user input is valid', async () => {

            const transferServiceMock = sinon.stub(transferService, 'transfer');
            transferServiceMock.returns({
                from: 'Hyui',
                to: 'Jiroy',
                value: 10000,
                date: new Date().toISOString()
            });

            const resposta = await request(app)
                .post('/transfer')
                .set('Authorization', `Bearer ${authSetupFile.getToken()}`)
                .send({
                    "from": "WeAreMockingTheReturnWhatGoesHereDoesntMatter",
                    "to": "WeAreMockingTheReturnWhatGoesHereDoesntMatter",
                    "value": 102938484756
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