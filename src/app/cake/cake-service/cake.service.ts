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
  private _patchCakeSubject:Subject<Cake> = new Subject<Cake>();

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


  editCake(cake:Cake):void{
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'my-auth-token'
      })
    };
    const id:string = cake.id;
    const title:string = cake.title;
    const comment:string = cake.comment;
    const image:File | string = cake.image;
    const stars:string = JSON.stringify(cake.stars);


    const cakeData = new FormData();
    cakeData.append("title", title);
    cakeData.append("comment", comment);
    cakeData.append("stars", stars);

    if(typeof(image)==='string'){
      cakeData.append("image", image);
    }
    else{
      cakeData.append("image", image, title);
    }
   


    this.http.put<{message:string}>(`${BACKEND_URL}/${id}`, cakeData)
      .pipe(
        catchError(this.handleError))
      .subscribe(res=>{
        console.log(res.message)
        this.getCakes();
      });
  }


  deleteCake(id:string){
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'my-auth-token'
      })
    };
    this.http.delete<{message:string}>(`${BACKEND_URL}/${id}`, httpOptions)
    .pipe(
      catchError(this.handleError)
    ).subscribe(res=>{
      console.log(res.message);
      this.getCakes();
    });
  }

  private handleError(error: HttpErrorResponse):Observable<HttpErrorResponse> {
    console.log(error.error);
    return throwError(error);
  }

  get cakesSubject():Observable<Cake[]>{
    return this._cakesSubject.asObservable();
  }

  get patchCakeSubject():Observable<Cake>{
    return this._patchCakeSubject.asObservable();
  }


  editPatchForm(cake:Cake):void{
    this._patchCakeSubject.next(cake);    
  }


}
