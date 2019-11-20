import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication-service/authentication.service';


@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.sass']
})
export class NavigationComponent implements OnInit {
  private _logoutVisible:boolean = false;

  constructor(private authService:AuthenticationService) { }

  ngOnInit() {
    this.authService.currentUserIdSubject.subscribe(res=>{
      if(res===null){
        this._logoutVisible = false;
      }
      else{
        this._logoutVisible = true;
      }
    })
  }

  logOut():void{
    this._logoutVisible = false;
    this.authService.logOut();
  }
}
