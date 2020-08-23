const { gql } = require('apollo-server');


//Schema
const typeDefs = gql`

    type Usuario {
        id: ID
        nombre: String
        apellido: String
        email: String
        createdOn: String
    }

    type Token {
        token: String
    }

    type Producto {
        id: ID
        nombre: String
        existencia: Int
        precio: Float
        createdOn: String
    }

    input UsuarioInput {
        nombre: String!
        apellido: String!
        email: String!
        password : String!
    }
    input AuthInput {
        email: String!
        password: String!
    }

    input ProductoInput {
        nombre: String!
        existencia: Int!
        precio: Float!
    }

    type Query {
        getUser(token: String!): Usuario
    }

    type Mutation {
        # Users
        nuevoUsuario(input: UsuarioInput): Usuario
        autenticarUsuario(input: AuthInput): Token

        #Products
        nuevoProducto(input: ProductoInput): Producto

    }
`;

module.exports = typeDefs;