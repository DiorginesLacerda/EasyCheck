var express = require("express");
var router = express.Router();
var db = require("../../db");
var model = require("./empresa-model");
var Empresa = db.mongoose.model('empresas', model.empresaSchema);


/*GET All */
router.get("/", (req, res, next)=> {
    Empresa.find({}).lean().exec((e, docs) => {
      if (e) {
        res.json(e);
        res.end();
      }
      res.json(docs);
      res.end();
    });
})
/*GET By Id*/
router.get("/:id", (req, res, next)=> {
    Empresa.findOne({_id:req.params.id}).lean().exec((e, docs) => {
        if (e) {
          res.json(e);
          res.end();
        }
        res.json(docs);
        res.end();
      });
})
/*POST */
router.post('/', (req,res,next)=>{
    var novaEmpresa = new Empresa({
        RazaoSocial:req.body.RazaoSocial,
        CNPJ:req.body.CNPJ,
        Logotipo:req.body.Logotipo // mudar para armazenar o logotipo em storage local
    })
    novaEmpresa.save(e=>{
        if(e){
          res.status(500).json({ error: e.message });
          res.end();
          return;
        }
        res.json(novaEmpresa);
        res.end();
      })
})
module.exports = router;

