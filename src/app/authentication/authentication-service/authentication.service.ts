import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';

import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { User } from '../user.model';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

const BACKEND_URL:string = environment.apiUrl +'/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private _timeout:ReturnType<typeof setTimeout>;

  constructor(private http:HttpClient, private _router:Router) { }

  signUp(user: User):void {
    this.http.post<{message:string}>(BACKEND_URL, user)
      .pipe(
        catchError(this.handleError)
      )
      .subscribe(res=>{
        console.log(res.message);
      });
  }

  logIn(user:User):void{
    this.http.post<{message:string, token:string}>(`${BACKEND_URL}/login`, user)
    .pipe(
      catchError(this.handleError)
    )
    .subscribe(res=>{
      this.storeToken(res.token);
      this._router.navigate(['/hub'])

    });
  }

  private handleError(error: HttpErrorResponse):Observable<HttpErrorResponse | any> {
    return throwError(error);
  }

  storeToken(token:string):void {
    const nowDate = new Date()
    const nowTime = nowDate.getTime();
    const expirationTime = nowTime + 3600000;

    localStorage.setItem('token', token);
    localStorage.setItem('expirationTime', JSON.stringify(new Date(expirationTime)));

    this._timeout = setTimeout(()=>{
      this.logOut();
    },3600000)

  }

  logOut():void{
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');

    clearTimeout(this._timeout);

    this._router.navigate(['/auth']);
  }

  autoLogin():void{
    const token:string = localStorage.getItem('token');
    const expirationTime:number = new Date(JSON.parse(localStorage.getItem('expirationTime'))).getTime();
    const now:number = new Date().getTime();
    const expiresIn:number = expirationTime - now;

    if(token!==undefined && expirationTime!==undefined){
      this._timeout = setTimeout(() => {
        this.logOut();
      }, expiresIn);
    }
  }

}
