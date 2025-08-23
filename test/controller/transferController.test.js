const request = require('supertest')
const sinon = require('sinon')
const { expect } = require('chai')

const app = require('../../app')

const transferService = require('../../service/transferService')

describe('transferController', () => {
    describe('POST /tranfer', () => {
        it('Deve retorna 400 caso sender or recipient does not exist', async () => {
            const resposta = await request(app)
                .post('/transfer')
                .send({
                    "from": "Gabriel",
                    "to": "Wanderson",
                    "value": 10000
                })
                expect(resposta.status).to.equal(400)
                expect(resposta.body).to.have.property('error', 'Sender or recipient does not exist')
        })

        it('Usando Mocks: Deve retorna 400 caso sender or recipient does not exist', async () => {

            const transferServiceMock = sinon.stub(transferService, 'transfer')
            transferServiceMock.throws(new Error('Sender or recipient does not exist'))            

            const resposta = await request(app)
                .post('/transfer')
                .send({
                    "from": "Gabriel",
                    "to": "Wanderson",
                    "value": 10000
                })
                expect(resposta.status).to.equal(400)
                expect(resposta.body).to.have.property('error', 'Sender or recipient does not exist')
        })
    })

    /*
    describe('', () => {

    })

    describe('', () => {

    })
    */

})