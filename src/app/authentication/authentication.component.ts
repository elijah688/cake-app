import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ViewEncapsulation } from '@angular/core';
import { AuthenticationService } from './authentication-service/authentication.service';
import { User } from './user.model';

@Component({
  //encapsulation: ViewEncapsulation.None,
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.sass']
})
export class AuthenticationComponent implements OnInit {

  public authModeLogin = true;
  public hidePassword = true;
  constructor(private fb: FormBuilder, private authService:AuthenticationService) { }

  authForm = this.fb.group({
    email: ['', [Validators.email, Validators.required, Validators.minLength(6)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  ngOnInit() {
  }


  toggleAuthMode():void{
    this.authModeLogin = !this.authModeLogin;
  }

  getRemainingCharacters(formControlName:string):number {
    const hasMinLengthError = this.authForm.get(formControlName).hasError('minlength');

    if(hasMinLengthError){
      const actualLength = this.authForm.get(formControlName).errors.minlength.actualLength;
      const requiredLength = this.authForm.get(formControlName).errors.minlength.requiredLength;

      const remainingChars =  requiredLength - actualLength;
      return remainingChars;
    }
    else{
      return 0;
    }
  }

  authenticate():void{
    const email = this.authForm.get('email').value;
    const password = this.authForm.get('password').value;

    const user:User = {
      email:email,
      password:password
    }

    if(this.authModeLogin===true){
      this.authService.logIn(user);
    }
    else{
      this.authService.signUp(user);
    }
  }

}
