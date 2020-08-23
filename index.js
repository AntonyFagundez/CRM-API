const { ApolloServer } = require('apollo-server');
const typeDefs = require('./db/schema');
const resolvers = require('./db/resolvers');
const connect = require('./config/db')

connect();

//Servidor
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context : () =>{
        return {
            miContext : "hola"
        };
    }
});
//arancar servidor
server.listen().then(({url})=>{
    console.log(`Servidor listo en la URL: ${url}`)
});
