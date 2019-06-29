import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MainComponent } from './main/main.component';
import { TraduzTipoPipe } from './main/traduz-tipo.pipe';
import { paraCentimetros } from './paraCentimetros.pipe';
import { paraQuilogramas } from './paraQuilograma.pipe';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { PokeGridComponent } from './poke-grid/poke-grid.component';

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