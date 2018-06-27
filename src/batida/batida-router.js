var express = require("express");
var router = express.Router();
var db = require("../../db");
//var model = require("../usuario/usuario-model");
var batidaModel = require("./batida-model");
//var Usuario = db.mongoose.model("usuarios", model.usuarioSchema);
var Batida = db.mongoose.model("batida", batidaModel.batidaSchema);

/* GET all batidas */
router.get("/", function(req, res, next) {
  Batida.find({},{Usuario:0,_id:0,__v:0}).lean().exec(function(e, docs) {
    res.json(docs);
    res.end();
  });
});

/*GET todas do usuário */
router.get("/:id", (req, res, next) => {
  Batida.find({ "Usuario._id": req.params.id },{Usuario:0,_id:0,__v:0}).lean().exec((e, docs) => {
    if (e) {
      res.json(e);
      res.end();
    }
    res.json(docs);
    res.end();
  });
});

/* POST batidasPeriodo */
router.post("/:id", (req, res, next)=> {
  const userId = req.params.id;
  var dataIn = new Date(req.body.DataInicial);
  const dataFinal = new Date(`${req.body.DataFinal}T23:59:59`);
  Batida.find({
    "Usuario._id": req.params.id,
    DataHora: { $gte: dataIn },
    DataHora: { $lte: dataFinal }
  },{Usuario:0,_id:0,__v:0})
    .lean()
    .exec((e, docs) => {
      if (e) {
        res.json(e);
        res.end();
      }
      const relatorio = ({
        Empresa:{
          RazaoSocial:"TipoGoogle",//Não possível porque o esquema de dados precisa ser refeito
          CNPJ:"12.123.123/0001-12"
        },
        Batidas:docs
      })
      res.json(relatorio);
      res.end();
    });
});

/*POST novaBatida */
router.post('/', (req,res,next)=>{
  var novaBatida = new Batida({
    Usuario:{
      _id:req.body.Usuario.id,
      Nome:req.body.Usuario.Nome,
      Matricula:req.body.Usuario.Matricula,
  },
  DataHora:new Date(req.body.DataHora),
  Tipo:req.body.Tipo
  })
  novaBatida.save(e=>{
    if(e){
      res.status(500).json({ error: e.message });
      res.end();
      return;
    }
    res.json(novaBatida);
    res.end();
  })
})

module.exports = router;
