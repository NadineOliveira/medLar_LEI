var express = require('express');
var router = express.Router();
var passport = require("passport")
var SlotsController = require('../../controllers/slots')

// Slots Route
router.get('/',passport.authenticate('jwtAdmin',{session: false}), async (req,res,next) => {
    var slots = await SlotsController.getAllSlots()
    res.status(200).send(slots)
})

router.get('/medicamentos/:uid',passport.authenticate('jwt',{session: false}), async (req,res,next) => {
    var meds = await SlotsController.getMedicamentosByUtente(req.params.uid);
    for(i in meds){
        var horarios = await SlotsController.getHorarioByUtenteMedicamento(req.params.uid, meds[i].med)
        meds[i].horarios = horarios
    }
    res.status(200).send(meds)
})


router.get('/utentes/:mid',passport.authenticate('jwt',{session: false}), async (req,res,next) => {
    var utentes = await SlotsController.getUtentesByMedicamento(req.params.mid);
    res.status(200).send(utentes)
})

router.post('/',passport.authenticate('jwt',{session: false}), async (req,res,next) => {
    var med = req.body.med;
    var nr_utente = req.body.nr_utente;
    var data_inicio = req.body.data_inicio;
    var data_fim = req.body.data_fim;

    if(!data_fim)
        data_fim = "Indeterminado"

    var slot = await SlotsController.addSlot(med, nr_utente, data_inicio, data_fim);
    res.status(200).send(slot)
})

router.get('/:mid/horarios/:uid',passport.authenticate('jwt',{session: false}), async (req,res,next) => {
    var horarios = await SlotsController.getHorarioByUtenteMedicamento(req.params.mid,req.params.uid);
    res.status(200).send(horarios)
})


module.exports = router;