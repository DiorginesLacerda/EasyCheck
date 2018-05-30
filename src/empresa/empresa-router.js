var express = require("express");
var router = express.Router();
var db = require("../../db");
var model = require("./empresa-model");
var Empresa = db.mongoose.model('empresas', model.empresaSchema);

module.exports = router;