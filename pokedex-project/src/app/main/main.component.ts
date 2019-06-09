import { Component, OnInit, Input } from '@angular/core';
import { MainService } from './main.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  @Input() nomePokemon: string;
  pokemon: any;
  urlImagem: string;
  tiposPokemon: string[] = [];
  pesoPokemon: number;
  alturaPokemon: number;

  constructor(private mainService: MainService) { }

  ngOnInit() {
    this.pegarPokemon().subscribe(
      pokemon => {
        this.pokemon = pokemon
      
        this.pegarNome(this.pokemon);
        this.pegarImagem(this.pokemon);
        this.pegarTipo(this.pokemon);
        this.pegarPeso(this.pokemon);
        this.pegarAltura(this.pokemon);
    });
  }

  pegarPokemon() {
    return this.mainService.pegarPokemonPorNome(this.nomePokemon);
  }

  pegarNome(pokemon) {
      this.nomePokemon = pokemon.name;
  }

  pegarImagem(pokemon) {
      this.urlImagem = pokemon.sprites.front_default;
  }

  pegarTipo(pokemon) {
      pokemon.types.map((t) => {
        this.tiposPokemon.push(t.type.name);
      })
  }

  pegarPeso(pokemon) {
    this.pesoPokemon = pokemon.weight;
  }

  pegarAltura(pokemon) {
    this.alturaPokemon = pokemon.height;
  }

}
