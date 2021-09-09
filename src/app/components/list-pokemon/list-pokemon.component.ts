import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon';
import { RealService } from 'src/app/services/real.service';

@Component({
  selector: 'app-list-pokemon',
  templateUrl: './list-pokemon.component.html',
  styleUrls: ['./list-pokemon.component.scss']
})
export class ListPokemonComponent implements OnInit {

  constructor(public _ws:RealService) {
  
  }

  ngOnInit(): void {
  }

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
