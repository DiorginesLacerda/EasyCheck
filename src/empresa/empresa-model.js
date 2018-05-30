var mongoose = require('mongoose');

var empresaSchema = new mongoose.Schema({
    RazaoSocial:String,
    CNPJ:String,
    Logotipo:String
}, { collection: 'empresas' }
);

module.exports = { empresaSchema }