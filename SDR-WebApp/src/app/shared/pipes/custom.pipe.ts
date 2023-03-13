import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'custom',
})
export class CustomPipe implements PipeTransform {
  transform(value: any, ...args: unknown[]): any {
    return value.replace(
      /^[a-z]|[A-Z]/g,
      (c: any, i: any) => (i ? ' ' : '') + c.toUpperCase()
    ); // NOSONAR
  }
}
