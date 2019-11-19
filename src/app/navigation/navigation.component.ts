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

  constructor(private authService:AuthenticationService) { }

  ngOnInit() {
  }

  logOut():void{
    this.authService.logOut();
  }
}
