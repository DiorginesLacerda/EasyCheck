var express = require("express");
var router = express.Router();
var db = require("../../db");
var model = require("./usuario-model");
var Usuario = db.mongoose.model("usuarios", model.usuarioSchema);

/* GET all usuarios. */
router.get("/", function(req, res, next) {
  Usuario.find({}).lean().exec(function(e, docs) {
    res.json(docs);
    res.end();
  });
});

module.exports = router;
