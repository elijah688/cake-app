import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication-service/authentication.service';
import { Router } from '@angular/router';
import { CakeService } from '../cake/cake-service/cake.service';


@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.sass']
})
export class NavigationComponent implements OnInit {
  private _visible:boolean = false;

  constructor(private authService:AuthenticationService, private _cakeServ:CakeService, private _router:Router) { }

  ngOnInit() {
    this.authService.currentUserIdSubject.subscribe(res=>{
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

  showCakes():void{
    this._router.navigate(['/list'])
  }

  showDesign():void{
    this._cakeServ.editPatchForm(null);
    this._router.navigate(['/design'])
  }
}
