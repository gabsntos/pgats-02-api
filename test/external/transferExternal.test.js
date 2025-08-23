const request = require('supertest')
const { expect } = require('chai')

describe('transferExternal', () => {
    describe('POST /transfer', () => {
        it('Deve retorna 400 caso sender or recipient does not exist', async () => {
            const resposta = await request('http://localhost:3000')
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
})