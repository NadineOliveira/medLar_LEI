var express = require('express');
var router = express.Router();
var passport = require('passport');
var TarefasController = require('../../controllers/tarefas')

// Tarefas Router
router.get('/',passport.authenticate('jwt',{session: false}), async (req,res,next) => {
    var tars;
    if(req.user.estado==2)
        tars = await TarefasController.getAllTarefas();
    else 
        tars = await TarefasController.getAllTarefasByAuxiliar(req.user.id);    
    res.status(200).send(tars);
})

router.get('/concluidas',passport.authenticate('jwt',{session: false}), async (req,res,next) => {
    var tars;
    if(req.user.estado==2)
        tars = await TarefasController.getTarefasByEstado(1);
    else 
        tars = await TarefasController.getTarefasByAuxiliarAndEstado(req.user.id,1);
    res.status(200).send(tars);
})

router.get('/inconcluidas',passport.authenticate('jwt',{session: false}), async (req,res,next) => {
    var tars;
    if(req.user.estado==2)
        tars = await TarefasController.getTarefasByEstado(0);
    else 
        tars = await TarefasController.getTarefasByAuxiliarAndEstado(req.user.id,0);
    res.status(200).send(tars);
})

router.get('/:tid',passport.authenticate('jwt',{session: false}), async (req,res,next) => {
    var tar = await TarefasController.getTarefasById(tid);
    res.status(200).send(tar);
})

router.post('/',passport.authenticate('jwt',{session: false}), async (req,res,next) => {
    console.log(JSON.stringify(req.body))
    var nome = req.body.nome;
    var descricao = req.body.descricao;
    var data = req.body.data;
    var estado = 0;
    var auxiliar = req.body.nr_auxiliar;

    var tar = await TarefasController.addTarefa(nome,descricao,data,estado,auxiliar);
    console.dir(tar)
    res.status(200).send(tar);
})

router.get('/concluir/:tid',passport.authenticate('jwt',{session: false}), async (req,res,next) => {
    var tar = await TarefasController.concluirTarefa(req.params.tid);
    res.status(200).send(tar);
})

module.exports = router;