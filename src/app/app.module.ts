import { NgModule } from '@angular/core';
import { BrowserModule, } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { GarficaComponent } from './components/garfica/garfica.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { WinPokemonComponent } from './components/win-pokemon/win-pokemon.component';
import { ListPokemonComponent } from './components/list-pokemon/list-pokemon.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

// charts
import { NgxChartsModule } from '@swimlane/ngx-charts';

// socket.io
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
const config: SocketIoConfig = { url: 'https://pokemon-server-rest.herokuapp.com/', options: {} }

@NgModule({
  declarations: [
    AppComponent,
    GarficaComponent,
    NavbarComponent,
    WinPokemonComponent,
    ListPokemonComponent
  ],
  imports: [
    BrowserModule,
    NgxChartsModule,
    BrowserAnimationsModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
