import { Component } from '@angular/core';
import { RealService } from 'src/app/services/real.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  constructor(public _ws:RealService) { }


}
