const Usuario = require('../models/Usuario');
const Producto = require('../models/Producto');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config({path: 'variables.env'});

const createToken = (user, secret, expiresIn) => {
    const { id, email, nombre, apellido } = user;

    return jwt.sign({ id, email, nombre, apellido },secret, {expiresIn})


}


//Resolvers
const resolvers = {
    Query : {
        getUser : (_, {token}) => {
            const usuarioId = jwt.verify(token, process.env.SECRET);

            return usuarioId;
        }
    },
    Mutation: {
        nuevoUsuario: async (_, { input }) =>{

            const {email, password} = input;

            const existUser = await Usuario.findOne({email})
            //validaciones
            if(existUser){
                throw new Error('The User already exist');
            }
            //segurizar contraseña
            const salt = await bcryptjs.genSaltSync(10);
            input.password = await bcryptjs.hash(password, salt);

            try {
                const usuario = new Usuario(input);
                usuario.save();
                return usuario;
            } catch (error) {

            }

        
        },
        autenticarUsuario: async (_, { input }) =>{

            const {email, password} = input;

            const existUser = await Usuario.findOne({email});

            if(!existUser){
                throw new Error('El Usuario no existe')
            };

            //revisar password
            const passwordCorrecto = await bcryptjs.compareSync(password, existUser.password);

            if(!passwordCorrecto){
                throw new Error('Contraseña incorrecta')
            };

            //crear el token

            return {
                token: createToken(existUser, process.env.SECRET, '24h')
            }
        },
        //Producto
        nuevoProducto: async (_, { input }) => {
            try {
                const producto = new Producto(input);

                const resultado = await producto.save();

                return resultado;
            } catch (error) {
                console.error(error)
            }
        }
    }
}

module.exports = resolvers;