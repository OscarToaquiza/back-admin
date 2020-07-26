/**
 * Ruta: /api/todo
 */
const { Router } = require('express');
const Busqueda = require('../controllers/busquedas');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/:frase', validarJWT ,Busqueda.getTodo);

router.get('/collection/:tabla/:frase', validarJWT ,Busqueda.getDocumentosCollection);

module.exports = router