
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'active' })
export class ActiveStarsPipe implements PipeTransform {
  transform(stars: boolean[]) {
    return stars.filter(star => star===true);
  }
}