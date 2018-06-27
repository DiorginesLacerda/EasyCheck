var mongoose = require('mongoose');
var empresaSchema = require('../empresa/empresa-model')

var itemFolhaSchema = new mongoose.Schema({
    Valor:Number,
    Referencia:String,
    Acao:String,//Proventos ou Descontos
    CodItem:String,
    Descricao:String
});

var folhaSchema = new mongoose.Schema({
    Usuario:{
        _id:String,
        Nome: String,
        Matricula:String,
    },
    Funcao:String,
    SalarioHora:Number,
    SalarioBase:Number,
    MesPeriodo:String,
    AnoPeriodo:String,
    TipoContracheque:String,
    Departamento:String,
    CentroDeCusto:String,
    FGTS:Number,
    Empresa:{
        RazaoSocial:String,
        CNPJ:String,
        Logotipo:String
    },//Verificar os dados que se precisa da empresa no contracheque
    ItensFolha:[itemFolhaSchema]
    },{ collection: 'folhas' }
);

module.exports = { folhaSchema,itemFolhaSchema };