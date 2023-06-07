import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'clpFormat'
})
export class ClpFormatPipe implements PipeTransform {
  transform(value: number): string {
    const formattedValue = value.toString().replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return formattedValue;
  }
}
