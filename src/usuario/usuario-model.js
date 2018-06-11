var mongoose = require('mongoose');


var usuarioSchema = new mongoose.Schema({
    Nome: String,
    Senha: String,
    Matricula:String,
    Situacao:String,
    DataAdmissao:Date,
    LogotipoEmpresa:String
}, { collection: 'usuarios' }
);

module.exports = { usuarioSchema }