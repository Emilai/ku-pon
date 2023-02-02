import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'verifypipe'
})
export class VerifypipePipe implements PipeTransform {

  transform(arreglo: any[], texto: string = ''): any[] {

    if (texto === '') {
      return arreglo;
    }

    if (!arreglo) {
      return arreglo;
    }

    texto = texto.toLowerCase();

    return arreglo.filter(
      item => item.usuario.toLowerCase().includes(texto)
    );

  }

}
