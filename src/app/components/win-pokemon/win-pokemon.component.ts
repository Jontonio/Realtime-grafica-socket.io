import { Component, OnInit } from '@angular/core';
import { RealService } from 'src/app/services/real.service';

@Component({
  selector: 'app-win-pokemon',
  templateUrl: './win-pokemon.component.html',
  styleUrls: ['./win-pokemon.component.scss']
})
export class WinPokemonComponent implements OnInit {

  constructor(public _ws:RealService) { }

  ngOnInit(): void {
  }

}
