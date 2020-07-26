/**
 * Ruta: /api/usuarios
 */

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campo');
const Usuarios = require('../controllers/usuarios');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();


router.get('/', validarJWT ,Usuarios.getUsuarios);

router.post(
    '/',
     [
         check('nombre','El nombre es obligatorio').not().isEmpty(),
         check('password','El password es obligatorio').not().isEmpty(),
         check('email','El email es obligatorio').isEmail(),
         validarCampos,
     ] ,
     Usuarios.crearUsuario
    );

router.put(
    '/:id',
    [
        validarJWT,
        check('nombre','El nombre es obligatorio').not().isEmpty(),
        check('email','El email es obligatorio').isEmail(),
        check('role','El rol es obligatorio').not().isEmpty(),
        validarCampos
    ],
    Usuarios.acualizarUsuario);

router.delete(
    '/:id',
    validarJWT,
    Usuarios.borrarUsuario
    );

module.exports = router