var express = require('express');
var router = express.Router();
var passport = require('passport');
var MedicamentosController = require('../../controllers/medicamentos')

// Medicamentos Router
// Lista de Medicamentos
router.get('/',passport.authenticate('jwt',{session: false}), async (req,res,next) => {
    var meds = await MedicamentosController.getAllMedicamentos()
    res.status(200).send(meds)
})

// Medicamento por ID ou quantidade/preco (?qt=/?price=)
router.get('/:mid',passport.authenticate('jwt',{session: false}), async (req,res,next) => {
    if(req.query.qt!=null)
        var med = await MedicamentosController.addQuantidadeById(req.params.mid,req.query.qt)
    if(req.query.price!=null)
        var med = await MedicamentosController.updatePrecoById(req.params.mid, req.query.price)    
    else
        var med = await MedicamentosController.getMedicamentoById(req.params.mid)
    res.status(200).send(med)            
})



// Adicionar Medicamento
router.post('/', passport.authenticate('jwt', {session: false}), async (req, res, next) => {
    var nome = req.body.nome
    var preco = req.body.preco
    var lab = req.body.lab
    var uni_emb = req.body.uni_emb
    var formato = req.body.formato
    var dosagem = req.body.dosagem
    var quantidade = req.body.quantidade
    
    var med = await MedicamentosController.addMedicamento(nome,preco,lab,uni_emb,formato,dosagem,quantidade)
    res.status(200).send(med)
})

// Apagar Medicamento (Necessário apagar relaçoes)

module.exports = router;