import { Component, OnInit, OnDestroy } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication-service/authentication.service';
import { Router } from '@angular/router';
import { CakeService } from '../cake/cake-service/cake.service';
import { Subscription } from 'rxjs';


@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.sass']
})
export class NavigationComponent implements OnInit, OnDestroy {

  public _visible:boolean = false;
  private _visibleSub:Subscription = new Subscription();

  constructor(private authService:AuthenticationService, private _cakeServ:CakeService, private _router:Router) { }

  ngOnInit() {
    this._visibleSub = this.authService.currentUserIdSubject.subscribe(res=>{
      if(res===null){
        this._visible = false;
      }
      else{
        this._visible = true;
      }
    })

   

  }

  logOut():void{
    this._visible = false;
    this.authService.logOut();
  }


  patchDesign():void{
    this._cakeServ.editPatchForm(null);
  }


  ngOnDestroy(): void {
    this._visibleSub.unsubscribe()
  }


}
