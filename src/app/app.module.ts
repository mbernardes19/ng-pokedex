import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from '../componentes/navbar/navbar.component';
import { MainComponent } from '../componentes/main/main.component';
import { TraduzTipoPipe } from '../componentes/main/traduz-tipo.pipe';
import { paraCentimetros } from './paraCentimetros.pipe';
import { paraQuilogramas } from './paraQuilograma.pipe';
import { SearchBarComponent } from '../componentes/search-bar/search-bar.component';
import { PokeGridComponent } from '../componentes/poke-grid/poke-grid.component';
import { DetalhesPokemonComponent } from './paginas/detalhes-pokemon/detalhes-pokemon.component';
import { InicioComponent } from './paginas/inicio/inicio.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MainComponent,
    TraduzTipoPipe,
    paraCentimetros,
    paraQuilogramas,
    SearchBarComponent,
    PokeGridComponent,
    DetalhesPokemonComponent,
    InicioComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }