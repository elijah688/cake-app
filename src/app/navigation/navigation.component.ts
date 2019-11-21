import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication-service/authentication.service';
<<<<<<< HEAD
import { Router } from '@angular/router';
import { CakeService } from '../cake/cake-service/cake.service';
=======
>>>>>>> d2acb74c14608692b5d8215548cd14ff5d8d262c


@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.sass']
})
export class NavigationComponent implements OnInit {
<<<<<<< HEAD
  private _visible:boolean = false;

  constructor(private authService:AuthenticationService, private _cakeServ:CakeService, private _router:Router) { }
=======
  private _logoutVisible:boolean = false;

  constructor(private authService:AuthenticationService) { }
>>>>>>> d2acb74c14608692b5d8215548cd14ff5d8d262c

  ngOnInit() {
    this.authService.currentUserIdSubject.subscribe(res=>{
      if(res===null){
<<<<<<< HEAD
        this._visible = false;
      }
      else{
        this._visible = true;
=======
        this._logoutVisible = false;
      }
      else{
        this._logoutVisible = true;
>>>>>>> d2acb74c14608692b5d8215548cd14ff5d8d262c
      }
    })
  }

  logOut():void{
<<<<<<< HEAD
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
=======
    this._logoutVisible = false;
    this.authService.logOut();
  }
>>>>>>> d2acb74c14608692b5d8215548cd14ff5d8d262c
}
