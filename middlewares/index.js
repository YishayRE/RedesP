const validaCampos = require('../middlewares/validar');
const validaJWT = require('../middlewares/jsonwt');

module.exports = {
	...validaCampos,
	...validaJWT
}