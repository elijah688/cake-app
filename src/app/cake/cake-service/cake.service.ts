import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HttpHeaders } from '@angular/common/http';
import { Cake } from '../cake-model/cake.model';

const BACKEND_URL:string = environment.apiUrl +'/cake';

@Injectable({
  providedIn: 'root'
})
export class CakeService {


  constructor(private http:HttpClient) { }

  getCakes(): void {
    this.http.get<Cake[]>(BACKEND_URL).subscribe(res=>{
      console.log(res);
    })
  }
  
  addCake(cake: Cake): void {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'my-auth-token'
      })
    };

     this.http.post<{message:string, cake:Cake}>(BACKEND_URL, cake, httpOptions)
      .pipe(
        catchError(this.handleError)
      ).subscribe(res=>{
        console.log(res);
      })
  }

 


  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(error);
  }


}
