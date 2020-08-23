const moongoose = require('mongoose');

const UsuarioSchema = moongoose.Schema({
    nombre : {
        type: String,
        required: true,
        trim: true
    },
    apellido: {
        type: String,
        required: true,
        trim: true
    },
    email :{
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    createdOn : {
        type: Date,
        default: Date.now()
    }
});

module.exports = moongoose.model('Usuario', UsuarioSchema);