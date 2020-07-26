/**
 * Path '/api/login'
 */
const { Router } = require('express');
const { check } = require('express-validator');
const Auth = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campo');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();

router.post('/',[
    check('email','El email es obligatorio').isEmail(),
    check('password','El password es obligatorio').not().isEmpty(),
    validarCampos
],Auth.login);

router.post('/google',[
    check('token','El token de Google es obligatorio').not().isEmpty(),
    validarCampos
],Auth.loginGoogle);


router.get('/renew', validarJWT ,Auth.renewToken);

module.exports = router;