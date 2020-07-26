/**
 * Ruta: /api/uploads/
 */
const { Router } = require('express');
const expressFileUpload = require('express-fileupload');

const { validarJWT } = require('../middlewares/validar-jwt');
const Uploads = require('../controllers/uploads');
const router = Router();

router.use(expressFileUpload());
router.put('/:tabla/:id', validarJWT , Uploads.fileUpload);
router.get('/:tabla/:foto' , Uploads.retornaImagen);

module.exports = router