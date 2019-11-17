import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-cake',
  templateUrl: './cake.component.html',
  styleUrls: ['./cake.component.sass']
})
export class CakeComponent implements OnInit {
 @Input() public title:string;
 @Input() public comment:string;

 @Input() public stars:number;

  constructor() { }

  ngOnInit() {
   
  }
}
