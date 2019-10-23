import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'leftpad'
})
export class LeftpadPipe implements PipeTransform {

  transform(value: string): string {
    let lines:Array<string> = value.split("\n");

    return lines.map(line => "   " + line).join("\n");
  }

}
