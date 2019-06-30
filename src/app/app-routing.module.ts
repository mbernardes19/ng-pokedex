import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetalhesPokemonComponent } from './paginas/detalhes-pokemon/detalhes-pokemon.component';
import { InicioComponent } from './paginas/inicio/inicio.component';

const routes: Routes = [
  {path:'', component: InicioComponent },
  {path: 'detalhes-pokemon', component: DetalhesPokemonComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
