const { Socket } = require("socket.io");
const { dataPokemon } = require("../api/pokemon");

// lista de clientes conectados
let listClientes = [];
let listaPokemons = dataPokemon;

// cliente conectado
const conectado = (cliente = Socket, io = Socket.Server) => {
    listClientes.push(cliente.id);
    cliente.emit('list-clientes', listClientes );
  }

  // discconnect
  const desconectado = (cliente = Socket, io = Socket.Server) => {

    cliente.on('disconnect', () => {
      listClientes.splice(1,1);
      io.emit('list-clientes', listClientes );
    })

}

// metodo para escuchar los votos
const escucharVoto = (cliente = Socket, io = Socket.Server) => {

    cliente.on('votar', data => {

        listaPokemons.find( pokemon => {

            if(pokemon.id == data.id){
                pokemon.votos += 1;
                // emitir los datos para la grafica
                dataGrafica(io);
                // emitir al pokemon ganador
                pokemonWin(io);
                // emit la data actualizada a todos los usuarios
                io.emit('lista-pokemons', listaPokemons );
                return;
            }

        })

    })
}

// enviar los datos para la grafica en base a los pokemones
const dataGrafica = (io = Socket.Server) => {

    listGrafica = [];

    listaPokemons.forEach( pokemon => {
        const data = { 'name':pokemon.name, 'value':pokemon.votos }
        listGrafica.push(data)
    })

    io.emit('data-grafica', listGrafica );
}

// cargar la lista de pokemones a un solo cliente
const cargarPokemons = async (cliente, io) => {
  cliente.emit('lista-pokemons', listaPokemons );
}

// funcion del pokemon ganador en base a la lista
const pokemonWin = (io) => {

  let mayor = 0;
  let pokemonWin = null;

  listaPokemons.forEach( pokemon => {

    if(pokemon.votos > mayor){
      mayor = pokemon.votos;
      pokemonWin = pokemon;
      return;
    }

  })

  io.emit('pokemon-win', pokemonWin)

}


module.exports = {
    desconectado,
    conectado,
    escucharVoto,
    dataGrafica,
    cargarPokemons,
    pokemonWin
}
