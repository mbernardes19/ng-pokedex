import { Component, OnInit, Input } from '@angular/core';
import { MainService } from './main.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  @Input() nomePokemon: string;
  pokemonJSON: any;
  idPokemon: number;
  urlImagem: string;
  tiposPokemon: string[] = [];
  pesoPokemon: number;
  alturaPokemon: number;
  @Input() jujuba: string;

  constructor(private mainService: MainService) { }

  ngOnInit() {
    this.pegarPokemon().subscribe(
      pokemonJSON => {
        this.pokemonJSON = pokemonJSON
      
        this.pegarNome(this.pokemonJSON);
        this.pegarImagem(this.pokemonJSON);
        this.pegarTipo(this.pokemonJSON);
        this.pegarPeso(this.pokemonJSON);
        this.pegarAltura(this.pokemonJSON);
        this.pegarNum(this.pokemonJSON);
    });
  }

  pegarPokemon() {
    return this.mainService.pegarPokemonPorNome(this.nomePokemon);
  }

  pegarNum(pokemonJSON){
    this.idPokemon = pokemonJSON.id;
  }

  pegarNome(pokemonJSON) {
      this.nomePokemon = pokemonJSON.name;
  }

  pegarImagem(pokemonJSON) {
      this.urlImagem = pokemonJSON.sprites.front_default;
  }

  pegarTipo(pokemonJSON) {
      pokemonJSON.types.map((t) => {
        this.tiposPokemon.push(t.type.name);
      })
  }

  pegarPeso(pokemonJSON) {
    this.pesoPokemon = pokemonJSON.weight;
  }

  pegarAltura(pokemonJSON) {
    this.alturaPokemon = pokemonJSON.height;
  }

}
