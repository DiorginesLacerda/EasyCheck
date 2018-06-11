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

/*POST create usuario */
router.post('/',(req,res,next)=>{
  const senhaCripto = req.body.Senha;//criptografar senha no banco 
  var novoUsuario = new Usuario({
    Nome: req.body.Nome,
    Senha: senhaCripto,
    Matricula:req.body.Matricula,
    Situacao:req.body.Situacao,
    LogotipoEmpresa:req.body.LogotipoEmpresa,
    DataAdmissao:new Date(req.body.DataAdmissao)
  })
  novoUsuario.save(e=>{
    if(e){
      res.status(500).json({ error: e.message });
      res.end();
      return;
    }
    res.json(novoUsuario);
    res.end();
  })
})

/*DELETE One */
router.delete('/:id',(req,res,next)=>{
  Usuario.findByIdAndRemove(req.params.id, (e,data)=>{
    if(e){
      res.status(500).json({ error: e.message });
      res.end();
      return;
    }
    if(!data){
      res.status(400).json({ error: 'Id não encontrado' });
      res.end();
      return;
    }
    res.json({success:true});
    res.end();
  })
})

module.exports = router;
