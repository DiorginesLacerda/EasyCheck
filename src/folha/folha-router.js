var express = require("express");
var router = express.Router();
var db = require("../../db");
var model = require("./folha-model");
var Folha = db.mongoose.model("folhas", model.folhaSchema);
var ItemFolha = db.mongoose.model('itens-folha',model.itemFolhaSchema);

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
router.get("/:id", (req, res, next) => {
  const userId = req.params.id;
  const dataIn = new Date(req.body.dataInicial);
  const dataFinal = new Date(req.body.dataFinal);
  Folha.find({
    "Usuario._id": userId,
    DataHora: { $gte: dataIn },
    DataHora: { $lte: dataFinal }
  })
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
            _id:req.body.Usuario.id,
            Nome: req.body.Usuario.Nome,
            Matricula:req.body.Usuario.Matricula,
            //Verificar se necessita de mais algum campo de usuário
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
      res.json(novaBatida);
      res.end();
    })
  })

module.exports = router;
