import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';

import { HttpErrorResponse, HttpClient, HttpParams } from '@angular/common/http';
import { throwError, Observable, Subject, BehaviorSubject, of } from 'rxjs';
import { User } from '../user.model';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { MatSnackBarRef, MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from 'src/app/snackbar/snackbar.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationDialogComponent } from '../authentication-dialog/authentication-dialog.component';

const BACKEND_URL:string = environment.apiUrl +'/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private _timeout:ReturnType<typeof setTimeout>;
  private _currentUserIdSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);
  private _loadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private _emailPatchSubject: Subject<string> = new Subject<string>();

  constructor(
    private http:HttpClient, 
    private _router:Router, 
    private _snack:MatSnackBar,
    private _signUpDialog:MatDialog) { }

  signUp(user: User):void {
    this.http.post<{message:string}>(BACKEND_URL, user)
      .pipe(
        catchError(this.handleError)
      )
      .subscribe(res=>{
        this._signUpDialog.open(AuthenticationDialogComponent,{
          height: '12.69rem',
          width: '17.06rem',
          data: user.email,
          panelClass: 'auth-dialog'
        })
        this._emailPatchSubject.next(user.email);  
        this._loadingSubject.next(false);
        console.log(res.message);
      });
  }

  logIn(user:User):void{
    this.http.post<{message:string, token:string, userId:string}>(`${BACKEND_URL}/login`, user)
    .pipe(
      catchError(this.handleError)
    )
    .subscribe(res=>{
      this.storeToken(res.token, res.userId);
      this._currentUserIdSubject.next(res.userId);
      
      this._loadingSubject.next(false);
      this._router.navigate(['/hub'])

      this._snack.openFromComponent(SnackbarComponent, {
        duration: 3000,
        panelClass: "modal-pink"
      })
    });
  }

  private handleError(error: HttpErrorResponse):Observable<HttpErrorResponse | any> {
    return throwError(error);
  }

  storeToken(token:string, userId:string):void {
    const nowDate = new Date()
    const nowTime = nowDate.getTime();
    const expirationTime = nowTime + 3600000;

    localStorage.setItem('token', token);
    localStorage.setItem('expirationTime', JSON.stringify(new Date(expirationTime)));
    localStorage.setItem('currentUser', userId);

    this._timeout = setTimeout(()=>{
      this.logOut();
    },3600000)

  }

  logOut():void{
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
    localStorage.removeItem('currentUser');

    clearTimeout(this._timeout);

    this._router.navigate(['/auth']);
  }

  autoLogin():void{
    const token:string = localStorage.getItem('token');
    const expirationTime:number = new Date(JSON.parse(localStorage.getItem('expirationTime'))).getTime();
    const now:number = new Date().getTime();
    const expiresIn:number = expirationTime - now;

    const currentUser:string = localStorage.getItem('currentUser');


    if(token!==null && expirationTime!==null){
      this._timeout = setTimeout(() => {
        this.logOut();
      }, expiresIn);
      this._currentUserIdSubject.next(currentUser);
    }
  }

  get currentUserIdSubject():Observable<string>{
    return this._currentUserIdSubject.asObservable();
  }

  isEmailUnique(controlValue:string):Observable<{isUnique:boolean}> {
    const email:string = controlValue;

    return this.http.get<{isUnique:boolean}>(`${BACKEND_URL}/emailUnique/${email}`)
      .pipe(
        catchError(this.handleError)
      )
    }

    get loadingSubject():Subject<boolean>{
      return this._loadingSubject;
    }

    get emailPatchSubject():Observable<string>{
      return this._emailPatchSubject.asObservable();
    }

}
