import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AuthenticationService } from './authentication-service/authentication.service';
import { User } from './user.model';
import { uniqueEmail } from './authentication-validators/unique-email.validator';
import { BehaviorSubject, Subscription } from 'rxjs';
import { MyErrorStateMatcher } from '../error-state-matcher/error-state-matcher';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.sass']
})
export class AuthenticationComponent implements OnInit, OnDestroy {

  public authModeLogin = true;
  public hidePassword = true;
  private _authModeLoginSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  private _authModeLoginSubjectSubscription:Subscription = new Subscription();
  private _errorStateMatcher:MyErrorStateMatcher = new MyErrorStateMatcher();

  public authForm = this.fb.group({
    email: ['', [Validators.email, Validators.required, Validators.minLength(6)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(
    private fb: FormBuilder, 
    private authService:AuthenticationService) { }

  ngOnInit() {
   this._authModeLoginSubjectSubscription =  this._authModeLoginSubject.subscribe(isLogin=>{
    this.handleEmailValidators(isLogin);
    })
  }

 
  toggleAuthMode():void{
    this.authModeLogin = !this.authModeLogin;
    this._authModeLoginSubject.next(this.authModeLogin);
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

  handleEmailValidators(isLogin:boolean){
    if(isLogin===true){
      this.authForm.get("email").clearAsyncValidators();
    }
    else{
      this.authForm.get("email").setAsyncValidators(uniqueEmail(this.authService));
    }
    this.authForm.get("email").updateValueAndValidity();
    console.log(this.authForm.get('email').errors)
  }

  ngOnDestroy(){
    this._authModeLoginSubjectSubscription.unsubscribe();
  }

}
