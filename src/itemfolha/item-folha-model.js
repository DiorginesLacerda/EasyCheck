var mongoose = require('mongoose');

var itemFolhaSchema = new mongoose.Schema({
    Vencimentos:Number,
    Referencia:String,
    Descontos:Number,
    CodItem:String,
    Descricao:String
});

module.exports = { itemFolhaSchema };