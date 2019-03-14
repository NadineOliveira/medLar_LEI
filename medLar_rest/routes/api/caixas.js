var express = require('express');
var router = express.Router();
var passport = require('passport');

var CaixasController = require('../../controllers/caixasController')

// Caixa Router
// Caixa de Medicamento do Utente
router.get('/:utente',passport.authenticate('jwt',{session: false}), (req,res,next) => {
    CaixasController.getCaixaById(req.params.utente)
            .then(dados => res.jsonp(dados))
            .catch(error => res.status(500).send('Erro na consulta da caixa do utente!'))
})

// Addicionar Medicamento ao Utente
router.post('/', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    var Medicamento_id = req.body.Medicamento_id
    var Utente_id = req.body.Utente_id
    var data_inicio = req.body.data_inicio
    var data_fim = req.body.data_fim
    var periodo = req.body.periodo
    
    CaixasController.addMedToCaixa({Medicamento_id,Utente_id,data_inicio,data_fim,periodo})
            .then(() => res.status(200).send('Medicamento adicionado à caixa com sucesso!'))
            .catch(error => res.status(500).send('Erro na adição de medicamento à caixa!'))
})
