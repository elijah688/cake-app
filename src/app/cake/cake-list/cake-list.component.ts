import { Component, OnInit } from '@angular/core';
import { Cake } from '../cake-model/cake.model';

@Component({
  selector: 'app-cake-list',
  templateUrl: './cake-list.component.html',
  styleUrls: ['./cake-list.component.sass']
})
export class CakeListComponent implements OnInit {

  public cake: Cake = {
    title: 'My Cake',
    comment:"The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting.",
    stars: [true, true, true, false, false] 
  };

  public cake2: Cake = {
    title: 'My Cake',
    comment:"The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting.",
    stars: [true,true,true,true,true] 
  };

  public cakes: Cake[] = [this.cake, this.cake2];


  constructor() { }

  ngOnInit() {
  }

}
