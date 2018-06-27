var express = require("express");
var router = express.Router();
var db = require("../../db");
var model = require("./folha-model");
var EmpresaModel = require("../empresa/empresa-model")
var Folha = db.mongoose.model("folhas", model.folhaSchema);
var ItemFolha = db.mongoose.model('itens-folha',model.itemFolhaSchema);
var Empresa = db.mongoose.model('empresas',EmpresaModel.empresaSchema)

/*GET all */
router.get("/", (req, res, next) => {
  console.log('Achou o serviço')
  Folha.find({}).lean().exec((e, docs) => {
    if (e) {
      res.json(e);
      res.end();
    }
    res.json(docs);
    res.end();
  });
});

/*GET todas do usuário */
router.get("/:id", (req, res, next) => {

  Folha.find({ "Usuario._id": req.params.id }).lean().exec((e, docs) => {
    if (e) {
      res.json(e);
      res.end();
    }
    res.json(docs);
    res.end();
  });
});



/*POST retorna por período por usuário */
router.post("/:id", (req, res, next) => {
  Folha.find({
    "Usuario._id": req.params.id,
    MesPeriodo: req.body.MesPeriodo,
    AnoPeriodo: req.body.AnoPeriodo
  },{Usuario:0,_id:0,__v:0,'ItensFolha._id':0})
    .lean()
    .exec((e, docs) => {
      if (e) {
        res.json(e);
        res.end();
      }
      res.json(docs);
      res.end();
    });
});

/*POST Cria nova */
router.post('/', (req,res,next)=>{
    var itens = (req.body.ItensFolha).map(item =>{
        return new ItemFolha({
            Valor:item.Valor,
            Referencia:item.Referencia,
            Acao:item.Acao,
            CodItem:item.CodItem,
            Descricao:item.Descricao
        })
    })

    var novaFolha = new Folha({
        Usuario:{
            _id:req.body.Usuario.Id,
            Nome: req.body.Usuario.Nome,
            Matricula:req.body.Usuario.Matricula,
        },
        Funcao:req.body.Funcao,
        SalarioHora:req.body.SalarioHora,
        SalarioBase:req.body.SalarioBase,
        MesPeriodo:req.body.MesPeriodo,
        AnoPeriodo:req.body.AnoPeriodo,
        TipoContracheque:req.body.TipoContracheque,
        Departamento:req.body.Departamento,
        CentroDeCusto:req.body.CentroDeCusto,
        FGTS:req.body.FGTS,
        Empresa:{
          RazaoSocial:req.body.Empresa.RazaoSocial,
          CNPJ:req.body.Empresa.CNPJ,
          Logotipo:req.body.Empresa.Logotipo
        },
        ItensFolha:itens
    })

    novaFolha.save(e=>{
      if(e){
        res.status(500).json({ error: e.message });
        res.end();
        return;
      }
      res.json(novaFolha);
      res.end();
    })
  })

/*DELETE One */
router.delete('/:id',(req,res,next)=>{
  Folha.findByIdAndRemove(req.params.id, (e,data)=>{
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
