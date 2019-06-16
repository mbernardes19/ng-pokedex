import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'traduzTipo'
})
export class TraduzTipoPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    switch (value){
      case "fire":
        return "fogo"
      case "water":
        return "água"
      case "electric":
        return "elétrico"
      case "flying":
        return "voador"
      case "grass":
        return "grama"
      case "fighting":
        return "lutador"
      case "poison":
        return "venenoso"
      case "ground":
        return "terrestre"
      case "rock":
        return "pedra"
      case "bug":
        return "inseto"
      case "ghost":
        return "fantasma"
      case "psychic":
        return "psíquico"
      case "ice":
        return "gelo"
      case "dragon":
        return "dragão"
      case "dark":
        return "nortuno"
      case "steel":
        return "metal"
      case "fairy":
        return "fada"
      case "normal":
        return "normal"
    }
  }

}
