const Usuario = require('../models/usuarios');

const existeCorreo = async(correo = '') =>{
	const existeC = await Usuario.findOne({correo});
	if(existeC){
		throw new Error(`El correo ${correo} ya fue registrado en otra cuenta`)
	}
}

const existeUsuario = async(id) =>{
	const existeU = await Usuario.findById(id);
	if(!existeU){
		throw new Error(`El usuario no existe`)
	}
}

module.exports = {
	existeCorreo,
	existeUsuario
}