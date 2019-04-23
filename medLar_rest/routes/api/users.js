var express = require('express');
var router = express.Router();
var passport = require("passport")
var jwt = require('jsonwebtoken')
var UsersController = require("../../controllers/usersControllers")
var modelsU = require('../../models/Auxiliar')
var utente = require('../..//dbQueries/utenteQueries');
var auxiliar = require('../../dbQueries/auxiliarQueries')
// User Route
router.get('/all',async (req,res) => {
    res.send( await auxiliar.desativarAuxiliarById(2));
});

router.get('/', (req,res) => {
    modelsU.findAll({
        where: {
            id: 123
        }
    })
                    .then(data => res.send(data))
                    .catch(err => res.status(400).send("Error: "+err))
})
// Login User
router.post('/login', async (req,res,next) => {
    passport.authenticate('login', async (err,user,info)=> {
        try {
            if(err || !user){
                const error = new Error('An Error Occured')
                return next(error);
            }
            req.login(user, {session: false}, async (error) => {
                if(error) return next(error)
                const myuser = {id: user.id, password: user.password}
                const token = jwt.sign({user: myuser}, 'MedLar_Lei2019')
                req.user.token = token
                req.session.token = token

                res.status(200).send('Login Efetuado com sucesso')

            })
        } catch (err) {
            return next(err)
        }
    }) (req,res,next)
})



module.exports = router;