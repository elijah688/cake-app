import { Component, OnInit, Input, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { CakeService } from '../../cake-service/cake.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cake-list-item',
  templateUrl: './cake-list-item.component.html',
  styleUrls: ['./cake-list-item.component.sass']
})
export class CakeListItemComponent implements OnInit {
  @Input() public id:string;
  @Input() public title:string;
  @Input() public imagePath:string;

  public currentUserSub:Subscription = new Subscription();

  constructor(private cakeService:CakeService, private _router:Router) { }

  ngOnInit() {
  }

  deteils():void{
    this._router.navigate([`/${this.id}`])
  }

}
