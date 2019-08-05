import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { MainService } from './main.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';

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
  habilidadesPokemon: string[] = [];
  navItemSelecionado = 'sobre';
  nomePokemonCamel: string;
  statusBase: any[] = [];

  constructor(private mainService: MainService, private route: ActivatedRoute) { }
    @ViewChild('background', {static: true}) backgroundElement: ElementRef<any>;

  ngOnInit() {
    this.pegarPokemonPorQueryParameter()
    .subscribe(pokemonJSON => {
        this.pokemonJSON = pokemonJSON;
        this.pegarNome(this.pokemonJSON);
        this.pegarImagem(this.pokemonJSON);
        this.pegarTipo(this.pokemonJSON);
        this.pegarPeso(this.pokemonJSON);
        this.pegarAltura(this.pokemonJSON);
        this.pegarNum(this.pokemonJSON);
        this.pegarTexto(this.pokemonJSON);
        this.pegarHabilidades(this.pokemonJSON);
        this.pegarStatusBase(this.pokemonJSON);
    });

    this.preencherBackground();

  }

  preencherBackground() {
    const coresTipos = {
      fire: '#FA5543',
      flying: '#79A4FF'
    };

    const tipo1 = this.tiposPokemon[0];
    const tipo2 = this.tiposPokemon.length > 1 ? this.tiposPokemon[1] : this.tiposPokemon[0];

    const background = this.backgroundElement.nativeElement as HTMLDivElement;
    background.style.backgroundImage = 'linear-gradient(coresTipos[tipo1], coresTipos[tipo2])';
  }







  mudarFocoNavItem(event) {
    const navItem = <HTMLElement>event.target;
    if (navItem.id !== this.navItemSelecionado)
      this.navItemSelecionado = navItem.id;
  }

  pegarPokemonPorQueryParameter() {
    const queryParams = this.route.queryParams;
    
    return queryParams
    .pipe(
      switchMap(param => {
        this.idPokemon = parseInt(param.id);
        return this.pegarPokemon(parseInt(param.id));
      }));
  }

  pegarPokemon(id) {
    return this.mainService.getPokemonById(id);
  }

  pegarNum(pokemonJSON){
    this.idPokemon = pokemonJSON.id;
  }

  pegarNome(pokemonJSON) {
      this.nomePokemon = pokemonJSON.name;
      this.nomePokemonCamel = pokemonJSON.name.charAt(0).toUpperCase() + pokemonJSON.name.slice(1);
  }

  pegarHabilidades(pokemonJSON) {
    this.habilidadesPokemon = pokemonJSON.abilities;
  }

  pegarImagem(pokemonJSON) {
    let numPokemon  = '';
    if (pokemonJSON.id < 10) {
      numPokemon = '00' + pokemonJSON.id;
    }
    if (pokemonJSON.id >= 10 && pokemonJSON.id < 100) {
      numPokemon = '0' + pokemonJSON.id;
    }
    if (pokemonJSON.id >= 100) {
      numPokemon = pokemonJSON.id;
    }

    this.urlImagem = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${numPokemon}.png`
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
            return texto.language.name === 'en' && texto.version.name === 'emerald';
          })

          descricoes = especieJSON.genera;
          const descricoesFiltradas = descricoes.filter((descricao) => {
            return descricao.language.name === 'en';
          });

          this.descricaoPokemon = descricoesFiltradas[0].genus;
          this.textoPokemon = textosFiltrados[0].flavor_text;
        });
  }

  pegarStatusBase(pokemonJSON) {
    this.statusBase = pokemonJSON.stats.reverse();
  }

}
