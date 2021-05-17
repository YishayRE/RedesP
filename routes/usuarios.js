const {Router} = require('express');
const {check} = require('express-validator');

const {
	usuariosGet, 
	usuariosPut, 
	usuariosPost, 
	usuariosDelete, 
	usuariosPatch
} = require('../controllers/usuarios');

const {
	existeCorreo,
	existeUsuario
} = require('../helpers/dbval');

const {
	validarCampos,
	validarJWT
} = require('../middlewares');

const router = Router();

router.get('/', usuariosGet);
router.put('/:id', [
	check('id', 'No es un ID valido').isMongoId(),
	check('id').custom(existeUsuario),
	//check('rol').custom( esRoleValido ),
	validarCampos
], usuariosPut);
router.post('/',[
	check('nombre', 'El nombre no es valido').not().isEmpty(),
	check('password', 'El password no es valido').isLength({min: 6}),
	check('correo', 'El correo no es valido').isEmail(),
	check('correo').custom( existeCorreo ),
	//check('rol').custom( esRoleValido ),
	validarCampos,
],usuariosPost);
router.delete('/:id',
	validarJWT,
	//tieneRol('ADMIN_ROLE'),
	check('id', 'No es un ID valido').isMongoId(),
	check('id').custom(existeUsuario),
	validarCampos
	,usuariosDelete);
router.patch('/', usuariosPatch);

module.exports = router;