import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { Pokemon } from '../models/pokemon';

@Injectable({
  providedIn: 'root'
})
export class RealService {

  statusServer   : boolean = false;
  listaClientes  : string[] = [];
  listaPokemos   : Observable<Pokemon[]>;
  dataGrafica    : any[] = [];
  pokeWin        : Pokemon;

  constructor(private socket: Socket) {
    this.checkStatus();
    this.pokemonWin();
  }

  checkStatus(){

    // verificar si se conecto al servidor el cliente
    this.socket.on('connect', () => {
      this.statusServer = true;
    })

    // verificar si el cliente desconecto
    this.socket.on('disconnect', () => {
      this.statusServer = false;
    })

    // escuchar los cliente conectados
    this.listen('list-clientes').subscribe( res => {
      this.listaClientes = res as any;
    })

    // pipe async para el componente list-pokemons
    this.listaPokemos = this.listen('lista-pokemons') as any;

    // escuchar la data para mostrar la gráfica
    this.listen('data-grafica')
        .subscribe( res => {
          this.dataGrafica = res as any;
    })

  }

  // método para votar por un pokémon
  votar(pokemon:Pokemon){
      this.socket.emit('votar', pokemon);
  }

  // método para escuchar al pokémon ganador
  pokemonWin(){
    this.listen('pokemon-win').subscribe( res =>{
      this.pokeWin = res as any;
    })
  }

  // método genérico para escuchar al servidor
  listen(name: string){
    return this.socket.fromEvent(name);
  }

  // método genérico para emitir
  emit(name:string, pyload?:any){
    return this.socket.emit(name, pyload);
  }

  // método para visualizar números enormes
  digits(numero:number):string{

    let num = '';

    if(numero < 1000){
      return numero.toString()
    }

    if(numero>=1000 && numero<1000000){
      return `${numero/1000}k`
    }

    if(numero>=1000000){
      return `${numero/1000000}M`
    }

    return num;
  }

}
