import { Component, OnInit, Input } from '@angular/core';
import { MainService } from '../main/main.service';
import { tap, map, concatMap, mergeMap, toArray } from 'rxjs/operators';
import { from } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-poke-grid',
  templateUrl: './poke-grid.component.html',
  styleUrls: ['./poke-grid.component.scss']
})
export class PokeGridComponent implements OnInit {
  @Input() nomePokemon: string;
  pokemonJSON: any;
  imagemPokemon: string;
  idPokemon: number;
  listaPokemonJSON: any[] = [];
  listaPokemon = undefined;
  offset = 0;
  loading = false;

  constructor(private mainService: MainService, private router: Router) { }

  ngOnInit() {
    window.onscroll = this.checarLimiteTela;


    this.pegarTodosPokemon(this.offset)
      .subscribe(json => {
        this.listaPokemonJSON = json.results; // Pega 20 Pokémon
        
        
        
        
        this.listaPokemon = [];
        this.listaPokemonJSON.map(pokemon => {
          this.pegarPokemonPorNome(pokemon['name'])
            .subscribe(dadosPokemon => {
              console.log(dadosPokemon);
              this.listaPokemon.push(dadosPokemon);
              this.listaPokemon.sort(this.compare);
              this.listaPokemon.map(pokemon => {
                console.log(pokemon.name);
                
                if (pokemon.id < 10 && pokemon.id.toString().charAt(0)!=='0') {
                  pokemon.id = '0' + pokemon.id.toString();
                }

                pokemon.name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
              });   
            });  
        })
      })
  }

  pegarTodosPokemon(offset){
    return this.mainService.getPokemon(offset);
  }

  pegarPokemonPorNome(nomePokemon){
    return this.mainService.getPokemonByNome(nomePokemon);
  }

  pegarPokemonPorId(){
    return this.mainService.getPokemonById(this.idPokemon);
  }

  pegarImagem(pokJSON){
    this.imagemPokemon = pokJSON.sprites.front_default;
  }

  compare = function compare (a,b) {
    const idPokeA = a.id;
    const idPokeB = b.id;
    let comparison = 0;
    if (idPokeA > idPokeB) {
      comparison = 1;
    } else if (idPokeA < idPokeB) {
      comparison = -1;
    }
    return comparison;
  };


  checarLimiteTela = () => {    
    if(document.documentElement.clientHeight + document.scrollingElement.scrollTop >= document.scrollingElement.scrollHeight) {
      this.offset += 20;
      this.pegarTodosPokemon(this.offset)
        .pipe(
          map(json => json.results),
          concatMap(pokemonArr => from(pokemonArr)),
          mergeMap(pokemon => {
            return this.pegarPokemonPorNome(pokemon['name'])
          }),
          tap(pokemon => {
            if (pokemon.id < 10 && pokemon.id.toString().charAt(0)!=='0') {
              pokemon.id = '0' + pokemon.id.toString();
            }
            pokemon.name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
          }),
          toArray(),
          map(pokemonArr => pokemonArr.sort(this.compare)),
        )
        .subscribe(dadosPokemon => {
          this.listaPokemon.push(...dadosPokemon);

        });
    }
  }

  abrirDetalhesPokemon(event) {
    console.log(event);
    let elemento = event.target;
    if(event.target.nodeName === 'IMG') {
      elemento = event.target.parentElement;
    }
    let id = elemento.textContent.slice(0,3);
    id = parseInt(id);

    this.router.navigate(['detalhes-pokemon'], {queryParams: {id: id}});

  }
}