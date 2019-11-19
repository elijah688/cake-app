import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './authentication/authentication-service/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'cakes';

  constructor(private _authService:AuthenticationService){

  }

  ngOnInit():void{
    this._authService.autoLogin();
  }

}
