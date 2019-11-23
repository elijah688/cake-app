import { Component, OnInit, OnChanges, OnDestroy, ViewChild } from '@angular/core';
import {FormBuilder, FormGroup, Validators, NgForm} from '@angular/forms';
import { AuthenticationService } from './authentication-service/authentication.service';
import { User } from './user.model';
import { uniqueEmail } from './authentication-validators/unique-email.validator';
import { BehaviorSubject, Subscription } from 'rxjs';
import { MyErrorStateMatcher } from '../error-state-matcher/error-state-matcher';
import { format } from 'url';

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
  private _patchEmailSub:Subscription = new Subscription();
  private _errorStateMatcher:MyErrorStateMatcher = new MyErrorStateMatcher();
  loading:boolean = false; 
  loadingSubscription:Subscription = new Subscription();

  public authForm = this.fb.group({
    email: ['', [Validators.email, Validators.required, Validators.minLength(6)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });


  constructor(
    private fb: FormBuilder, 
    private authService:AuthenticationService) { }

  ngOnInit() {
   this._authModeLoginSubjectSubscription = this._authModeLoginSubject.subscribe(isLogin=>{
    this.authModeLogin = isLogin;
    this.handleEmailValidators(this.authModeLogin);
    })

    this.loadingSubscription = this.authService.loadingSubject.subscribe(loading=>{
      this.loading = loading;
    })

    this._patchEmailSub = this.authService.emailPatchSubject.subscribe(email=>{
      if(email){
        this.authForm.get("email").patchValue(email);
        this.authForm.get("email").updateValueAndValidity();
        this._authModeLoginSubject.next(true);
      }
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
    if(this.authForm.valid){
      this.loading = true;
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
      this.authForm.reset();
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
  }

  ngOnDestroy(){
    this._authModeLoginSubjectSubscription.unsubscribe();
    this.loadingSubscription.unsubscribe();
  }

}
