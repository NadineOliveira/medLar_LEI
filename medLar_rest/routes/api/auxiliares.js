var express = require('express');
var router = express.Router();
var passport = require("passport")
var AuxiliaresController = require('../../controllers/auxiliares')

// Auxiliar Route

router.get('/',passport.authenticate('jwt',{session: false}), async (req,res,next) => {
    var auxiliares = await AuxiliaresController.getAllAuxiliares()
    res.status(200).send(auxiliares)
})



router.get('/ativos',passport.authenticate('jwtAdmin',{session: false}), async (req,res,next) => {
    var auxiliares = await AuxiliaresController.getAuxiliaresByEstado(1);
    res.status(200).send(auxiliares)
})


router.get('/inativos',passport.authenticate('jwtAdmin',{session: false}), async (req,res,next) => {
    var auxiliares = await AuxiliaresController.getAuxiliaresByEstado(0);
    res.status(200).send(auxiliares)
})

router.get('/admins',passport.authenticate('jwtAdmin',{session: false}), async (req,res,next) => {
    var auxiliares = await AuxiliaresController.getAuxiliaresByEstado(2);
    res.status(200).send(auxiliares)
})


router.post('/criar',passport.authenticate('jwtAdmin',{session: false}), async (req,res,next) => {
    var id = req.body.id;
    var password = req.body.password;
    var contacto = req.body.contacto;
    var nome = req.body.nome;
    var apelido = req.body.apelido;
    var data_nascimento = req.body.data_nascimento;
    var rua = req.body.rua;
    var localidade = req.body.localidade;
    var codigo_postal = req.body.codigo_postal;
    var cidade = req.body.cidade;
    var estado = req.body.estado;

    var auxiliar = await AuxiliaresController.addAuxiliar(id,password,contacto,nome,apelido,data_nascimento,rua,localidade,codigo_postal,cidade,estado);
    res.status(200).send(auxiliar)
})

router.get('/:uid',passport.authenticate('jwtAdmin',{session: false}), async (req,res,next) => {
    var auxiliar = await AuxiliaresController.getAuxiliarById(req.params.uid);
    res.status(200).send(auxiliar)
})

router.get('/desativar/:uid',passport.authenticate('jwtAdmin',{session: false}), async (req,res,next) => {
    var auxiliar = await AuxiliaresController.mudarEstadoAuxiliarById(req.params.uid, 0);
    res.status(200).send(auxiliar)
})

router.get('/ativar/:uid',passport.authenticate('jwtAdmin',{session: false}), async (req,res,next) => {
    var auxiliar = await AuxiliaresController.mudarEstadoAuxiliarById(req.params.uid, 1);
    res.status(200).send(auxiliar)
})

router.get('/admin/:uid',passport.authenticate('jwtAdmin',{session: false}), async (req,res,next) => {
    var auxiliar = await AuxiliaresController.mudarEstadoAuxiliarById(req.params.uid, 2);
    res.status(200).send(auxiliar)
})

module.exports = router;