import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, Subject } from 'rxjs';
import { catchError, map, } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HttpHeaders } from '@angular/common/http';
import { Cake } from '../cake-model/cake.model';

const BACKEND_URL:string = environment.apiUrl +'/cake';

@Injectable({
  providedIn: 'root'
})
export class CakeService {
  private _cakesSubject:Subject<Cake[]> = new Subject<Cake[]>();

  constructor(private http:HttpClient) { }

  getCakes(): void {
    this.http.get<{message:string, cakes:Cake[]}>(BACKEND_URL).subscribe(res=>{
      console.log(res);
      this._cakesSubject.next(res.cakes);
    })
  }
  
  addCake(cake: Cake): void {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'my-auth-token'
      })
    };
    const title:string = cake.title;
    const comment:string = cake.comment;
    const image:File = <File>cake.image;
    const stars:string = JSON.stringify(cake.stars);

    const cakeData = new FormData();
    cakeData.append("title", title);
    cakeData.append("comment", comment);
    cakeData.append("image", image, title);
    cakeData.append("stars", stars);

    this.http.post<{message:string, cake:Cake}>(BACKEND_URL, cakeData, httpOptions)
      .pipe(
        catchError(this.handleError)
      ).subscribe(res=>{
        this.getCakes();
        console.log(res.message);
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

  get cakesSubject():Observable<Cake[]>{
    return this._cakesSubject.asObservable();
  }


}
