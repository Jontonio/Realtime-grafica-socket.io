import { Component, OnInit } from '@angular/core';
import { RealService } from 'src/app/services/real.service';

@Component({
  selector: 'app-garfica',
  templateUrl: './garfica.component.html',
  styleUrls: ['./garfica.component.scss']
})
export class GarficaComponent {

  // options
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = true;
  showLegend: boolean = false;
  showXAxisLabel: boolean = true;
  yAxisLabel: string = 'Pokemons';
  showYAxisLabel: boolean = true;
  xAxisLabel: string = 'votos';

  constructor( public _ws:RealService) {}

}
