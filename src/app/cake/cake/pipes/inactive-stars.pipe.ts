
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'inactive' })
export class InactiveStarsPipe implements PipeTransform {
  transform(stars: boolean[]) {
    return stars.filter(star => star===false);
  }
}