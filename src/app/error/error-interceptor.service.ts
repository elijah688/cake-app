import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';
import { AuthenticationService } from '../authentication/authentication-service/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private _errorDialog: MatDialog, private authService:AuthenticationService){

  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    return next.handle(req).pipe(catchError(err=>{
      return this.handleError(err,this._errorDialog)
    }))
  }

  handleError(error: HttpErrorResponse, dialog:MatDialog):Observable<HttpEvent<HttpErrorResponse>>{
    let errorMessage:string;
    if(error.error.message){
      errorMessage=error.error.message;
    }
    else{
      errorMessage = error.error;
    }

    dialog.open(ErrorDialogComponent,{
      height: '12.69rem',
      width: '17.06rem',
      data: errorMessage,
      panelClass: 'auth-dialog'
   })
    this.authService.loadingSubject.next(false);
    return throwError(error);
  }
}

