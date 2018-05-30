var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/easycheck');

module.exports = { mongoose }