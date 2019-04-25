var express = require('express');
var router = express.Router();
var passport = require('passport');


// Utentes Router
// Lista de Utentes
router.get('/',passport.authenticate('jwt',{session: false}), (req,res,next) => {
    UtentesController.getAllUtentes()
            .then(dados => res.jsonp(dados))
            .catch(error => res.status(500).send('Erro na consulta de utentes!'))
})

// Utente por ID
router.get('/:uid',passport.authenticate('jwt',{session: false}), (req,res,next) => {
    UtentesController.getUtenteById(req.params.uid)
            .then(dados => res.jsonp(dados))
            .catch(error => res.status(500).send('Erro na consulta de utentes!'))
})

// Adicionar Utente
router.post('/', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    var id = req.body.id
    var nome = req.body.nome
    var data_Nascimento = req.body.data_Nascimento
    var genero = req.body.genero
    var contacto = req.body.contacto
    var nome_Encarregado = req.body.nome_Encarregado
    var grau = req.body.grau
    var contacto_Encarregado = req.body.contacto_Encarregado
    var rua = req.body.rua
    var localidade = req.body.localidade
    var cod_Postal = req.body.cod_Postal
    
    UtentesController.addUtente({id,nome,data_Nascimento,genero,contacto,nome_Encarregado,grau,contacto_Encarregado,rua,localidade,cod_Postal})
            .then(() => res.status(200).send('Utente adicionado com sucesso!'))
            .catch(error => res.status(500).send('Erro na adição de utente!'))
})

// Desativar Utente
router.get('/desativar/:uid',passport.authenticate('jwt',{session: false}), (req,res,next) => {
    UtentesController.desativarUtenteById(req.params.uid)
            .then(() => res.status(200).send('Utente desativado com sucesso!'))
            .catch(error => res.status(500).send('Erro na desativação do utente!'))
})


module.exports = router;