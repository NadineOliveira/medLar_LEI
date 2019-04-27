var express = require('express');
var router = express.Router();
var passport = require('passport');
var TarefasController = require('../../controllers/tarefas')

// Horario Router
router.get('/',passport.authenticate('jwt',{session: false}), async (req,res,next) => {
    console.log(req.body)
    var tars = await TarefasController.getAllTarefas();
    res.status(200).send(tars);
})

router.get('/:tid',passport.authenticate('jwt',{session: false}), async (req,res,next) => {
    var tar = await TarefasController.getTarefasById(tid);
    res.status(200).send(tar);
})

router.post('/',passport.authenticate('jwt',{session: false}), async (req,res,next) => {
    var id = req.body.token.id
    var nome = req.body.nome
    var descricao = req.body.descricao
    var genero = req.body.genero
    var data = req.body.data
    var estado = req.body.estado
    var auxiliar = req.body.token.id

    var tar = await TarefasController.getTarefasById(id);
    res.status(200).send(tar);
})

module.exports = router;