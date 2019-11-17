import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-cake',
  templateUrl: './cake.component.html',
  styleUrls: ['./cake.component.sass']
})
export class CakeComponent implements OnInit {
 @Input() public title:string;
 @Input() public comment:string;
 @Input() public imagePath:string;
 @Input() public stars:number;

  constructor() { }

  ngOnInit() {
    // console.log(this.title, this.imagePath, this.comment, this.stars)
   
  }
}
