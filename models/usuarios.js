const {Schema, model} = require('mongoose');

const UsuarioSchema = Schema({
	nombre:{
		type: String,
		required: [true, 'El nombre es obligatorio']
	},
	correo:{
		type: String,
		required: [true, 'El correo es obligatorio'],
		unique: true
	},
	password:{
		type: String,
		required: [true, 'El password es obligatorio']
	},
	victorias:{
		type: Number,
		default: 0
	},
	derrotas:{
		type: Number,
		default: 0
	},
	empate:{
		type: Number,
		default: 0
	}
});

UsuarioSchema.methods.toJSON = function(){
	const { __v, password, _id, ...user } = this.toObject();
	user.uid = _id;
	return user;
}

module.exports = model('Usuario', UsuarioSchema);