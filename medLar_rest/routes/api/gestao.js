var express = require('express');
var router = express.Router();
var passport = require("passport")
var GestaoController = require('../../controllers/gestao')

// Gere Route
router.get('/',passport.authenticate('jwtAdmin',{session: false}), async (req,res,next) => {
    var gestoes = await GestaoController.getAllGestoes()
    res.status(200).send(gestoes)
})

router.get('/medicamentos/:uid',passport.authenticate('jwtAdmin',{session: false}), async (req,res,next) => {
    var meds = await GestaoController.getMedicamentosByAuxiliar(req.params.uid);
    res.status(200).send(meds)
})


router.get('/auxiliares/:mid',passport.authenticate('jwtAdmin',{session: false}), async (req,res,next) => {
    var auxiliares = await GestaoController.getAuxiliarByMedicamento(req.params.mid);
    res.status(200).send(auxiliares)
})

router.post('/',passport.authenticate('jwt',{session: false}), async (req,res,next) => {
    var nr_auxiliar = req.user.id;
    var med = req.body.med;

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;

    var data = yyyy + '-' + mm + '-' + dd;
    var quantidade = req.body.quantidade;

    var gestao = await GestaoController.addGestao(nr_auxiliar, med, data, quantidade);
    res.status(200).send(gestao)
})

module.exports = router;