var passport = require('passport')
var localStrategy = require('passport-local').Strategy

var Auxiliar = require('../dbQueries/auxiliarQueries')

// Login de utilizadores
passport.use('login', new localStrategy ({
    usernameField: 'id',
    passwordField: 'password'
}, async (id, password, done) => {
    try {
        if (typeof id === "undefined" && !id) 
            throw new Error ("ID não definido")
        if (typeof password === "undefined" && !password)
            throw new Error ("Password não definida")
    
        auxiliar = await Auxiliar.validatePassword(id, password)

        return done(null, auxiliar, {message: "Auxiliar Autenticado!"})
    }
    catch(erro) {
        return done(erro,false, {message: erro})
    }
}))

// Verificação do Token
var JWTstrategy = require('passport-jwt').Strategy
var ExtractJWT = require('passport-jwt').ExtractJwt

var extractToken = (req) => {
    var token = null
    if(req && req.session) token = req.session.token
    if (typeof token === 'undefined' && typeof req.headers.authorization !== 'undefined'){
        token = req.headers.authorization.replace('Bearer ', '')
    }
    return typeof token !== 'undefined' ? token : false
}

passport.use('jwt', new JWTstrategy({
    secretOrKey: "MedLar_Lei2019",
    jwtFromRequest: ExtractJWT.fromExtractors([extractToken])
}, async (token,done) => {
    try{
        if (typeof token === 'undefined')
            return done(erro)
        return done(null, token.user)
    } catch (erro) {
        return done(erro)
    }
}))

passport.use('jwtAdmin', new JWTstrategy({
    secretOrKey: "MedLar_Lei2019",
    jwtFromRequest: ExtractJWT.fromExtractors([extractToken])
}, async (token,done) => {
    try{
        if (typeof token === 'undefined')
            return done(erro)
        if (token.user.estado != 2)
            return done(erro)
            
        return done(null, token.user)
    } catch (erro) {
        return done(erro)
    }
}))