var express = require('express');
var router = express.Router();
var passport = require('passport');
var UtentesController = require('../../controllers/utentes')

// Utentes Router
router.get('/',passport.authenticate('jwt',{session: false}), async (req,res,next) => {
    var uts = await UtentesController.getAllUtentes();
    res.status(200).send(uts);
})


router.get('/ativos',passport.authenticate('jwt',{session: false}), async (req,res,next) => {
    var uts = await UtentesController.getUtentesByEstado(1);
    res.status(200).send(uts);
})

router.get('/inativos',passport.authenticate('jwt',{session: false}), async (req,res,next) => {
    var uts = await UtentesController.getUtentesByEstado(1);
    res.status(200).send(uts);
})

router.get('/:uid',passport.authenticate('jwt',{session: false}), async (req,res,next) => {
    var ut = await UtentesController.getUtenteById(req.params.uid);
    res.status(200).send(ut);
})

router.post('/',passport.authenticate('jwtAdmin',{session: false}), async (req,res,next) => {
    var nome = req.body.nome;
    var apelido = req.body.apelido;
    var genero = req.body.genero;
    var data_nascimento = req.body.data_nascimento;
    var contacto = req.body.contacto;
    var encarregado = req.body.encarregado;
    var parentesco = req.body.parentesco;
    var contacto_enc = req.body.contacto_enc;
    var rua = req.body.rua;
    var localidade = req.body.localidade;
    var codigo_postal = req.body.codigo_postal;
    var cidade = req.body.cidade;
    var estado = 1;

    var ut = await UtentesController.addUtente(nome,apelido,genero,data_nascimento,contacto,encarregado,parentesco,contacto_enc,rua,localidade,codigo_postal,cidade,estado);
    res.status(200).send(ut)
})

router.post('/update',passport.authenticate('jwtAdmin',{session: false}), async (req,res,next) => {
    var nr_processo = req.body.nr_processo;
    var nome = req.body.nome;
    var apelido = req.body.apelido;
    var genero = req.body.genero;
    var data_nascimento = req.body.data_nascimento;
    var contacto = req.body.contacto;
    var encarregado = req.body.encarregado;
    var parentesco = req.body.parentesco;
    var contacto_enc = req.body.contacto_enc;
    var rua = req.body.rua;
    var localidade = req.body.localidade;
    var codigo_postal = req.body.codigo_postal;
    var cidade = req.body.cidade;
    var estado = 1;

    var ut = await UtentesController.updateUtente(nr_processo,nome,apelido,genero,data_nascimento,contacto,encarregado,parentesco,contacto_enc,rua,localidade,codigo_postal,cidade,estado);
    res.status(200).send(ut)
})


router.get('/desativar/:uid',passport.authenticate('jwt',{session: false}), async (req,res,next) => {
    var uts = await UtentesController.mudarEstadoUtenteById(req.params.uid,0);
    res.status(200).send(uts);
})

router.get('/ativar/:uid',passport.authenticate('jwt',{session: false}), async (req,res,next) => {
    var uts = await UtentesController.mudarEstadoUtenteById(req.params.uid,0);;
    res.status(200).send(uts);
})


module.exports = router;