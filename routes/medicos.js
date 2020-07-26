/**
 * Medicos
 * Path: /api/hmedicos
 */

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campo');
const Medico = require('../controllers/medicos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();


router.get('/' , Medico.getMedicos);

router.post(
    '/',
     [
        validarJWT,
        check('nombre','El nombre del medico es necesario').not().isEmpty(),
        check('hospital','El hospital id debe ser válido').isMongoId(),
        validarCampos
     ] ,
     Medico.crearMedico
    );

router.put(
    '/:id',
    [
        validarJWT,
        check('nombre','El nombre del medico es necesario').not().isEmpty(),
        check('hospital','El hospital id debe ser válido').isMongoId(),
        validarCampos
    ],
    Medico.actualizarMedico
    );

router.delete(
    '/:id',
    validarJWT,
    Medico.borrarMedico
    );

module.exports = router