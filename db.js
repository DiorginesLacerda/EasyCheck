var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://easycheck:1qazxsw2@easychecktest-b8mdu.mongodb.net/test?retryWrites=true');
//mongoose.connect('mongodb://localhost/easycheck');

module.exports = { mongoose }