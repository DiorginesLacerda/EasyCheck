const test = require('tape')
const supertest = require('supertest')
const app = require('../app')

//testa o Get All
test('GET /batidas',t=>{
    supertest(app)
        .get('/batidas')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err,res)=>{
            t.error(err,'Sem Erros')
            t.assert()//valor esperado
            t.end()
        })
})

//testa o get all for user
//testa o get por período por usuário
