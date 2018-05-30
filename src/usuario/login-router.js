var express = require("express");
var router = express.Router();
var fs = require("node-fs");
var PNG = require("pngjs");
var b64 = require("base-64");
var PNGImage = require("pngjs-image");
var base64Img = require("base64-img");

var db = require("../../db");
var model = require("./usuario-model");
var Usuario = db.mongoose.model("usuarios", model.usuarioSchema);

/*Login*/
router.post("/login", (req, res, next) => {
  var db = require("../repositories/db");
  var Usuario = db.mongoose.model("usuarios", db.usuarioSchema);
  const _matricula = req.body.usuario;
  const _senha = req.body.senha;

  //Busca usuário no banco pela matrícula
  Usuario.findOne({ Matricula: _matricula }).lean().exec(function(e, doc) {
    //Verifica se encontrou o usuário
    if (doc) {
      var user = new Usuario(doc);
      //Verifica se a senha bate
      if (_senha == user.Senha) {
        const _logo = user.Folhas[0].Empresa.Logotipo;
        //Busca logotipo no storage
        fs.readFile(`./public/images/${_logo}.png`, (e, data) => {
          if (e) {
            //tratar erro em buscar a imagem
            console.log("Erro: ", e);
          } else {
            //converte o logotipo para base64
            const imgB64 = new Buffer(data).toString("base64");

            const response = {
              Nome: user.Nome,
              Situacao: user.Situacao,
              LogoEmpresa: imgB64
            };
            res.json(response);
            res.end();
          }
        });
      } else {
        res.json({ Erro: "Senha Incorreta" });
        res.end();
      }
    } else {
      res.json({ Erro: "Usuario não Encontrado" });
      res.end();
    }
  });
});

module.exports = router;
