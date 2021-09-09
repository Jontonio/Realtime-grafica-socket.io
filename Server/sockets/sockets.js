

const { Socket } = require("socket.io");
const ListaPokemons = require("../Clases/data");
const { Voto } = require("../Clases/voto");

// lista de clientes conectados
let listClientes = [];
let listaPokemons = ListaPokemons;

// cliente conectado
const conectado = (cliente = Socket, io = Socket.Server) => {
    listClientes.push(cliente.id);
    io.emit('list-clientes', listClientes );
}

// discconnect
const desconectado = (cliente = Socket, io = Socket.Server) => {

    cliente.on('disconnect', () => {
        listClientes.splice(1,1);
        io.emit('list-clientes', listClientes );
    })

}

const Pokemons = (io = Socket.Server) => {
    io.emit('lista-pokemons', listaPokemons );
}

const escucharVoto = (cliente = Socket, io = Socket.Server) => {

    cliente.on('votar', data => {

        const pokemon = listaPokemons.find( pokemon => {
            
            if(pokemon.id == data.id){
                pokemon.votos += 1;
                Pokemons(io);
                dataGrafica(io);
            }
            
        })
        
    })
}

const dataGrafica = (io = Socket.Server) => {

    listGrafica = [];

    listaPokemons.forEach( pokemon => {
        const data = { 'name':pokemon.nombre, 'value':pokemon.votos }
        listGrafica.push(data)
    })

    io.emit('data-grafica', listGrafica );
}




module.exports = {
    desconectado,
    conectado,
    escucharVoto,
    Pokemons,
    dataGrafica
}