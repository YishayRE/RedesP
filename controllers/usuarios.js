const {response} = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuarios');

const usuariosGet = async(req, res = response) => {
	//const query = {estado: true};
	const{limite = 5, desde = 0} = req.query;
	const [total, usuarios] = await Promise.all([
		Usuario.countDocuments({}),
		Usuario.find({})
			.skip(Number(desde))
			.limit(Number(limite))
	]);
	res.json({total, usuarios});
}

const usuariosPut = async(req, res = response) => {
	const {id} = req.params;
	const{_id, password, correo, ...resto} = req.body;
	
	if(password){
		const salt = bcryptjs.genSaltSync();
		resto.password = bcryptjs.hashSync(password, salt);
	}

	const usuario = await Usuario.findByIdAndUpdate(id, resto);

	res.json(id);
}

const usuariosPost = async(req, res = response) => {
	const {nombre, correo, password} = req.body;
	const usuario = new Usuario({nombre, correo, password});

	const salt = bcryptjs.genSaltSync();
	usuario.password = bcryptjs.hashSync(password, salt);

	await usuario.save();

	res.json({
			msg: 'post API - controlador',
			usuario
		}
	);
}

const usuariosDelete = async(req, res = response) => {
	const {id} = req.params;
	
	const usuario = await Usuario.findByIdAndDelete(id);

	const usuarioAutentificado = req.usuario;

	res.json({
			msg: `El usuario ${id} fue eliminado :(`,
			usuario,
			usuarioAutentificado
		}
	);
}

const usuariosPatch = (req, res = response) => {
	res.json({
			msg: 'patch API - controlador'
		}
	);
}

module.exports = {
	usuariosGet, 
	usuariosPut, 
	usuariosPost, 
	usuariosDelete, 
	usuariosPatch
}