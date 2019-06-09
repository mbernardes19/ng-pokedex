import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private httpClient: HttpClient) { }

  pegarPokemonPorNome(nomePokemon) {
    return this.httpClient.get<any>(`https://pokeapi.co/api/v2/pokemon/${nomePokemon}`);
  }
}