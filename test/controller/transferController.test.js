const request = require('supertest')
const sinon = require('sinon')
const { expect } = require('chai')

const app = require('../../app')

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
    })

    /*
    describe('', () => {

    })

    describe('', () => {

    })
    */

})