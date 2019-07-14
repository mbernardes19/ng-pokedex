import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'paraCentimetros'
})
export class paraCentimetros implements PipeTransform {

  transform(value: any, args?: any): any {
    console.log(value);
    const valorEmCm = value * 10;
    console.log(valorEmCm);
    if(valorEmCm > 100) {
      return (valorEmCm * 0.01) + 'm';
    }
    else {
      return valorEmCm + 'cm';
    }
  }

}
