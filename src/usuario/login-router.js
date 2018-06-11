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
router.post("/", (req, res, next) => {
  const _matricula = req.body.Usuario;
  const _senha = req.body.Senha;

  //Busca usuário no banco pela matrícula
  Usuario.findOne({ Matricula: _matricula }).lean().exec(function(e, doc) {
    //Verifica se encontrou o usuário
    if (doc) {
      console.log(doc)
      var user = new Usuario(doc);
      //Verifica se a senha bate
      if (_senha == user.Senha) {
        
        const _logo = user.LogotipoEmpresa;
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
              DataAdmissao: user.DataAdmissao,
              LogoEmpresa: imgB64,
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
