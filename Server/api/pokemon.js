const axios = require('axios');
const { Pokemon } = require('../Clases/pokemon');
// const ListaPokemons = require('../Clases/data');

let dataPokemon = [];

const getDataPokemon = async () => {

  const cantidad = 100;
  let promesas = []

  for (let index = 1; index <= cantidad; index++) {

    promesas.push( axios.get(`${process.env.URL_POKE}${index}`) );

  }

  const conten = await Promise.all( promesas );

  conten.forEach( poke => {
    const pokemon = new Pokemon(poke.data.id,
                                poke.data.name,
                                poke.data.sprites.other.dream_world.front_default);
                                dataPokemon.push(pokemon.toObject());
  })

  console.log('ok')

}

module.exports = {
  dataPokemon,
  getDataPokemon
}
