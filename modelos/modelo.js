/* 

var usuarioSchema = new mongoose.Schema({
    Nome: String,
    Senha: String,
    Matricula:String,
    Situacao:String,
    DataAdmissao:String,//deve udar para Data assim que for possível
    Batidas:[
        {
            DataHora:String,
            Tipo:String
        }
    ],
    Folhas:[
        {
            Funcao:String,
            SalarioHora:Number,
            SalarioBase:Number,
            MesPeriodo:String,
            AnoPeriodo:String,
            TipoContracheque:String,
            Departamento:String,
            CentroDeCusto:String,
            FGTS:Number,
            Empresa:{
                RazaoSocial:String,
                CNPJ:String,
                Logotipo:String
            },
            ItensFolha:[
                {
                    Vencimentos:Number,
                    Referencia:String,
                    Descontos:Number,
                    CodItem:String,
                    Descricao:String
                }
            ]
        }
    ]
}, { collection: 'usuarios' }
);
*/