var express = require("express");
var router = express.Router();
var db = require("../../db");
var model = require("../usuario/usuario-model");
var batidaModel = require('./batida-model')
var Usuario = db.mongoose.model("usuarios", model.usuarioSchema);

module.exports = router;
