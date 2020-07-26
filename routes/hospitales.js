/**
 * Holapitales
 * Path: /api/hospitales
 */

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campo');
const Hospital = require('../controllers/hospitales');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();


router.get('/' ,Hospital.getHospitales);

router.post(
    '/',
     [
        validarJWT,
        check('nombre','El nombre del hospital es necesario').not().isEmpty(),
        validarCampos
     ] ,
     Hospital.crearHospital
    );

router.put(
    '/:id',
    [
       validarJWT,
       check('nombre','El nombre del hospital es necesario').not().isEmpty(),
        validarCampos
    ],
    Hospital.actualizarHospital);

router.delete(
    '/:id',
    validarJWT,
    Hospital.borrarHospital
    );

module.exports = router