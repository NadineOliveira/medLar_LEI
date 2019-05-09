var express = require('express');
var router = express.Router();
var passport = require("passport")
var jwt = require('jsonwebtoken')

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
                const myuser = {id: user.id, password: user.password, estado: user.estado}
                const token = jwt.sign({user: myuser}, 'MedLar_Lei2019')
                req.user.token = token
                req.session.token = token

                res.status(200).send(req.user)

            })
        } catch (err) {
            return next(err)
        }
    }) (req,res,next)
})

router.get('/logout', passport.authenticate('jwt', {session: false}), (req,res,next) => {
    req.session.destroy(err => {
        res.status('200').send('Logout efetuado com sucesso');
    })
})


module.exports = router;