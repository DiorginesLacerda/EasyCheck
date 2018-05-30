var mongoose = require('mongoose');


var usuarioSchema = new mongoose.Schema({
    Nome: String,
    Senha: String,
    Matricula:String,
    Situacao:String,
    DataAdmissao:String,//deve udar para Data assim que for possível
    Batidas:[],
    Folhas:[]
}, { collection: 'usuarios' }
);

module.exports = { usuarioSchema }