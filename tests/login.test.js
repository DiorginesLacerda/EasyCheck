const test = require('tape')
const supertest = require('supertest')
const app = require('../app')

//testa o Login do usuário
test('GET /login',t=>{
    supertest(app)
        .get('/login')
        .expect('Content-Type', /json/)
        .expect(200)
        .end((err,res)=>{
            t.error(err,'Sem Erros')
            t.assert()//valor esperado
            t.end()
        })
})

//testa caso o usuário não exista
//testa caso senha incorreta

