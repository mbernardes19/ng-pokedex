import { Component, OnInit, Input } from '@angular/core';
import { MainService } from './main.service';
import { Router, ActivatedRoute } from '@angular/router';
import { mergeMap, switchMap } from 'rxjs/operators';

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
  textoPokemon: string;
  descricaoPokemon: string;

  constructor(private mainService: MainService, private route: ActivatedRoute) { }

  ngOnInit() {
    const queryParams = this.route.queryParams;
    queryParams
    .pipe(
      switchMap(param => {
        return this.pegarPokemon(parseInt(param.id));
      })
    )
    .subscribe(pokemonJSON => {
        this.pokemonJSON = pokemonJSON
      
        this.pegarNome(this.pokemonJSON);
        this.pegarImagem(this.pokemonJSON);
        this.pegarTipo(this.pokemonJSON);
        this.pegarPeso(this.pokemonJSON);
        this.pegarAltura(this.pokemonJSON);
        this.pegarNum(this.pokemonJSON);
        this.pegarTexto(this.pokemonJSON);
    });
  }

  pegarPokemon(id) {
    return this.mainService.getPokemonById(id);
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

  pegarTexto(pokemonJSON) {
    this.mainService.getPokemonTexto(pokemonJSON.id)
      .subscribe(
        especieJSON => {
          let descricoes = [];
          let textos = [];
          
          textos = especieJSON.flavor_text_entries;
          const textosFiltrados = textos.filter((texto) => {
            return texto.language.name === "en" && texto.version.name === "emerald";
          })

          descricoes = especieJSON.genera;
          const descricoesFiltradas = descricoes.filter((descricao) => {
            return descricao.language.name === "en";
          });

          this.descricaoPokemon = descricoesFiltradas[0].genus;
          this.textoPokemon = textosFiltrados[0].flavor_text;
        });;
  }

}
