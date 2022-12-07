import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverse',
})
export class ReversePipe implements PipeTransform {
  transform(value: any): any {
    if (value.length < 2) {
      return value;
    }
    return value.split('').reverse().join('');
  }
}
