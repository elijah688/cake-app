import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subject, Subscribable, Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/authentication/authentication-service/authentication.service';
import { CakeService } from '../../cake-service/cake.service';
import { Cake } from '../../cake-model/cake.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cake-list-item',
  templateUrl: './cake-list-item.component.html',
  styleUrls: ['./cake-list-item.component.sass']
})
export class CakeListItemComponent implements OnInit {
  @Input() public id:string;
  @Input() public title:string;
  @Input() public imagePath:string;
  // @Input() public comment:string;
  // @Input() public stars:boolean[];
  // @Input() public creator:string;
  // public currentUserId:string;
  public currentUserSub:Subscription = new Subscription();
  

  constructor(private cakeService:CakeService, private _router:Router) { }

  ngOnInit() {
  }

  deteils():void{
    this._router.navigate([`details/${this.id}`])
  }

}
