var express = require('express');
var router = express.Router();
var passport = require('passport');
var HorariosController = require('../../controllers/horarios')

// Horario Router
router.get('/',passport.authenticate('jwt',{session: false}), async (req,res,next) => {
    var hor = await HorariosController.getAllHorarios();
    res.status(200).send(hor);
})

module.exports = router;