import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ViewEncapsulation } from '@angular/core';

@Component({
  //encapsulation: ViewEncapsulation.None,
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.sass']
})
export class AuthenticationComponent implements OnInit {

  public authModeLogin = true;
  public hidePassword = true;
  constructor(private fb: FormBuilder) { }

  authForm = this.fb.group({
    email: [''],
    password: ['']
    });

  ngOnInit() {
  }


  toggleAuthMode():void{
    this.authModeLogin = !this.authModeLogin;
  }

}
