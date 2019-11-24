import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, Subject, BehaviorSubject, Observer } from 'rxjs';
import { catchError, } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Cake } from '../cake-model/cake.model';
import { Router } from '@angular/router';

const BACKEND_URL:string = environment.apiUrl +'/cake';

export interface PageOptions {
  currentPage: number,
  pageSize: number,
}

@Injectable({
  providedIn: 'root'
})
export class CakeService {

  private _cakesSubject:Subject<{cakes:Cake[],count:number}> = new Subject<{cakes:Cake[],count:number}>();
  private _patchCakeSubject:BehaviorSubject<Cake> = new BehaviorSubject<Cake>(null);
  
  private _pageOptionsSubject:BehaviorSubject<PageOptions> = new BehaviorSubject<PageOptions>({currentPage:1,pageSize:2});
  private _loadingSubject:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http:HttpClient, private _router:Router) { }

  getCakes(): void {
    this._loadingSubject.next(true);
    this._pageOptionsSubject.subscribe(pageOptions=>{
      const currentPage:number = pageOptions.currentPage;
      const pageSize:number = pageOptions.pageSize;
      const queryParams:string = `?pagesize=${pageSize}&currentpage=${currentPage}` 

      this.http.get<{message:string, cakes:Cake[], count:number}>(BACKEND_URL + queryParams).subscribe(res=>{
        this._cakesSubject.next({cakes:res.cakes, count:res.count});
        this._loadingSubject.next(false);
      })
    })
  }
  
  addCake(cake: Cake): void {
    this._router.navigate(['/cake/list']);
    
    const title:string = cake.title;
    const comment:string = cake.comment;
    const imagePath:File = <File>cake.imagePath;
    const yumFactor:string = JSON.stringify(cake.yumFactor);
    const creator:string = cake.creator;

    const cakeData = new FormData();
    cakeData.append("title", title);
    cakeData.append("comment", comment);
    cakeData.append("imagePath", imagePath, title);
    cakeData.append("yumFactor", yumFactor);
    cakeData.append("creator", creator);

    this.http.post<{message:string, cake:Cake}>(BACKEND_URL, cakeData)
      .pipe(
        catchError(this.handleError)
      ).subscribe(res=>{
        this.getCakes();
      })
  }


  editCake(cake:Cake):void{
    this._router.navigate(['/cake/list']);

    const id:string = cake.id;
    const title:string = cake.title;
    const comment:string = cake.comment;
    const imagePath:File | string = cake.imagePath;
    const yumFactor:string = JSON.stringify(cake.yumFactor);
    const creator:string = cake.creator;


    const cakeData = new FormData();
    cakeData.append("title", title);
    cakeData.append("comment", comment);
    cakeData.append("yumFactor", yumFactor);
    cakeData.append("creator", creator);


    if(typeof(imagePath)==='string'){
      cakeData.append("imagePath", imagePath);
    }
    else{
      cakeData.append("imagePath", imagePath, title);
    }
   
    this.http.put<{message:string}>(`${BACKEND_URL}/${id}`, cakeData)
      .pipe(
        catchError(this.handleError))
      .subscribe(res=>{
        console.log(res.message)
        this.getCakes();
      });
  }
  getCake(id:String):Observable<any>{
    return this.http.get<{message:string, cake:Cake}>(`${BACKEND_URL}/${id}`)
    .pipe(
      catchError(this.handleError)
    );
  }

  deleteCake(id:string){
    this._router.navigate(['/cake/list']);
    
    this.http.delete<{message:string}>(`${BACKEND_URL}/${id}`)
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



  get cakesSubject():Observable<{cakes:Cake[],count:number}>{
    return this._cakesSubject.asObservable();
  }

  get patchCakeSubject():Observable<Cake>{
    return this._patchCakeSubject.asObservable();
  }


  editPatchForm(cake:Cake):void{
    if(cake){
      this._router.navigate([`cake/design/${cake.id}`]);
      this._patchCakeSubject.next(cake);
    }
    else{
      this._router.navigate([`cake/design`]);
      this._patchCakeSubject.next(null);
    }
  }


  get pageOptionsSubject():Subject<PageOptions>{
    return this._pageOptionsSubject;
  }

  get loadingSubject():Observable<boolean>{
    return this._loadingSubject.asObservable();
  }


  yumToStars(yumFactor):boolean[]{
    const active = yumFactor;
    const inactive = 5 - active;
    const avtiveStars = Array(active).fill(true);
    const inactiveStars = Array(inactive).fill(false);

    const stars = [...avtiveStars, ...inactiveStars];
    
    
    return stars;
  }

  starsToYum(stars:boolean[]):number{
    const yum = stars.filter(s=>s===true).length;
    return yum
  }

}
