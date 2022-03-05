require('dotenv').config()
const express = require('express');
const cors = require('cors');

const { desconectado,
        conectado,
        escucharVoto,
        dataGrafica,
        cargarPokemons,
        pokemonWin} = require('../sockets/sockets');
const { getDataPokemon } = require('../api/pokemon');

const cor = {
    cors:{
        origin: "http://localhost:4200",
        methods: ["GET", "POST"]
    }
}

class Server{

    constructor(){

        this.app = express();
        // condifuración de socket.io
        this.server = require('http').Server(this.app);
        this.io = require('socket.io')(this.server, cor );

        // configuracion de middlewars y metodos
        this.port = process.env.PORT || 3000;
        this.middlewars();
        this.routes();

        this.listenSockets();
        this.getdataAPI();
    }

    middlewars(){
        this.app.use( cors() );
    }

    routes(){
        this.app.get('/', (req, res) => {
            res.send('Hola mundo')
        })
    }

    listenSockets(){
        this.io.on('connection', cliente => {
            // metodo de status de los clientes
            conectado(cliente, this.io);
            desconectado(cliente, this.io);
            cargarPokemons(cliente, this.io);
            escucharVoto(cliente, this.io);
            dataGrafica(this.io);
            pokemonWin(this.io);
        })

    }

    getdataAPI(){
      // get data pokemon on start server
      getDataPokemon();

    }

    listen(){
        this.server.listen(this.port, () => {
            console.log(`app listening at http://localhost:${this.port}`)
        })
    }
}

module.exports = Server;
