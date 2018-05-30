var mongoose = require('mongoose');


var batidaSchema = new mongoose.Schema({
    DataHora:String,
    Tipo:String
});

module.exports = { batidaSchema }