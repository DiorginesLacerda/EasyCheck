const test = require('tape')
const supertest = require('supertest')
const app = require('../app')

//testa o Get All
test('GET /folhas',t=>{
    supertest(app)
        .get('/folhas')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err,res)=>{
            t.error(err,'Sem Erros')
            t.assert()//valor esperado
            t.end()
        })
})

//POST retorna todas as folhas do usuário
//POST retorna por período por usuário
