var express = require('express');
var router = express.Router();
var passport = require('passport');

// Medicamentos Router
// Lista de Medicamentos
router.get('/',passport.authenticate('jwt',{session: false}), (req,res,next) => {
    MedicamentosController.getAllMedicamentos()
            .then(dados => res.jsonp(dados))
            .catch(error => res.status(500).send('Erro na consulta de medicamentos!'))
})

// Medicamento por ID
router.get('/:mid',passport.authenticate('jwt',{session: false}), (req,res,next) => {
    MedicamentosController.getMedicamentoById(req.params.mid)
            .then(dados => res.jsonp(dados))
            .catch(error => res.status(500).send('Erro na consulta de medicamento!'))
})

// Adicionar Medicamento
router.post('/', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    var id = req.body.id
    var nome = req.body.nome
    var dosagem = req.body.dosagem
    var forma = req.body.forma
    var unidades = req.body.unidades
    var laboratorio = req.body.laboratorio
    var preco = req.body.preco
    var comparticipacao = req.body.comparticipacao
    
    MedicamentosController.addMedicamento({id,nome,dosagem,forma,unidades,laboratorio,preco,comparticipacao})
            .then(() => res.status(200).send('Medicamento adicionado com sucesso!'))
            .catch(error => res.status(500).send('Erro na adição de medicamento!'))
})

// Apagar Medicamento (Necessário apagar relaçoes)

module.exports = router;