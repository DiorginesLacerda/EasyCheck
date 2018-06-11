var mongoose = require('mongoose');

var itemFolhaSchema = new mongoose.Schema({
    Valor:Number,
    Referencia:String,
    Acao:String,//Proventos ou Descontos
    CodItem:String,
    Descricao:String
});

module.exports = { itemFolhaSchema };