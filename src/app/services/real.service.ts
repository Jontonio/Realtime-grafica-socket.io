import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { concatAll, ignoreElements, map } from 'rxjs/operators';
import { Pokemon } from '../models/pokemon';

@Injectable({
  providedIn: 'root'
})
export class RealService {

  checkstatus   : boolean = false;
  listaClientes : string[] = [];
  listaPokemos  : Pokemon[] = [];
  dataGrafica   : any[] = [];
  pokeWin      : Pokemon;

  constructor(private socket: Socket) {
    this.checkStatus();
  }

  checkStatus(){

    // verificar si se conecto al servidor
    this.socket.on('connect', () => {
      this.checkstatus = true;
    })
    
    // verificar si de desconecto
    this.socket.on('disconnect', () => {
      this.checkstatus = false;
    })

    this.socket.fromEvent('list-clientes').subscribe( res => {
      this.listaClientes = res as any;
    })

    this.socket.fromEvent('lista-pokemons')
        .subscribe( res => {
          this.listaPokemos = res as Pokemon[];
          this.pokemonWin(this.listaPokemos);
    })

    this.socket.fromEvent('data-grafica')
        .subscribe( res => {
          this.dataGrafica = res as any;
    })

  }

  votar(pokemon:Pokemon){

      const { id, nombre } = pokemon;
      this.socket.emit('votar', {id, nombre, voto: 1 });

  }

  pokemonWin(pokemones:Pokemon[]){
    let mayor = 0;
    pokemones.forEach( pokemon => {

      if(pokemon.votos > mayor){
        mayor = pokemon.votos;
        this.pokeWin = pokemon;
        return;
      }
      
    })
  }

}
