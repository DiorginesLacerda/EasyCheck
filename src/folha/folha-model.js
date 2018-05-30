var mongoose = require('mongoose');

var folhaSchema = new mongoose.Schema({
    Funcao:String,
    SalarioHora:Number,
    SalarioBase:Number,
    MesPeriodo:String,
    AnoPeriodo:String,
    TipoContracheque:String,
    Departamento:String,
    CentroDeCusto:String,
    FGTS:Number,
    Empresa:{},
    ItensFolha:[]
});

module.exports = { folhaSchema };