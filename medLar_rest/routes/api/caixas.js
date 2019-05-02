var express = require('express');
var router = express.Router();
var passport = require("passport")
var CaixasController = require('../../controllers/caixas')

// Caixas Route
router.get('/',passport.authenticate('jwtAdmin',{session: false}), async (req,res,next) => {
    var caixas = await CaixasController.getAllCaixas()
    res.status(200).send(caixas)
})

router.get('/medicamentos/:uid',passport.authenticate('jwt',{session: false}), async (req,res,next) => {
    var meds = await CaixasController.getMedicamentosByUtente(req.params.uid);
    res.status(200).send(meds)
})


router.get('/utentes/:mid',passport.authenticate('jwt',{session: false}), async (req,res,next) => {
    var utentes = await CaixasController.getUtentesByMedicamento(req.params.mid);
    res.status(200).send(utentes)
})

router.post('/',passport.authenticate('jwt',{session: false}), async (req,res,next) => {
    var med = req.body.med;
    var nr_utente = req.body.nr_utente;
    var data_inicio = req.body.data_inicio;
    var data_fim = req.body.data_fim;
    var quantidade = req.body.quantidade;

    if(!data_fim)
        data_fim = "Indeterminado"

    var caixa = await CaixasController.addCaixa(med, nr_utente, data_inicio, data_fim, quantidade);
    res.status(200).send(caixa)
})

module.exports = router;