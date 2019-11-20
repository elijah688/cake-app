import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthenticationService } from './authentication/authentication-service/authentication.service';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'cakes';

  constructor(private authSev:AuthenticationService){

  }

  ngOnInit():void{
    this.authSev.autoLogin();
  }

}
