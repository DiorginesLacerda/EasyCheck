var mongoose = require('mongoose');


var batidaSchema = new mongoose.Schema({
    Usuario:{
        _id:String,
        Nome: String,
        Matricula:String,
    },
    DataHora:Date,
    Tipo:String
    },{ collection: 'batidas' }
);

module.exports = { batidaSchema }