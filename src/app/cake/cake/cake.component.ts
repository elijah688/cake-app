import { Component, OnInit, Input } from '@angular/core';
import { CakeService } from '../cake-service/cake.service';
import { Cake } from '../cake-model/cake.model';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-cake',
  templateUrl: './cake.component.html',
  styleUrls: ['./cake.component.sass']
})
export class CakeComponent implements OnInit {
  @Input() public id:string;
  @Input() public title:string;
  @Input() public comment:string;
  @Input() public stars:boolean[];
  @Input() public imagePath:string;

  
  constructor(private cakeService:CakeService) { }

  ngOnInit() {
  }

  editCake():void{
    const cake:Cake = {
      id:this.id,
      title:this.title,
      comment: this.comment,
      image: this.imagePath,
      stars: this.stars
    }
    this.cakeService.editPatchForm(cake);
  }

  deleteCake():void{
    this.cakeService.deleteCake(this.id);
  }

}
