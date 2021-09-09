import { Component } from '@angular/core';
import { RealService } from './services/real.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'grafica';
  constructor(private _socket:RealService){}
}
