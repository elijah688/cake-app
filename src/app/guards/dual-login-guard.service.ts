import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../authentication/authentication-service/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class DualLoginGuard implements CanActivate {
  constructor(private _authServ:AuthenticationService, private _router:Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const isLoggedIn:boolean = this._authServ.isLoggedIn;
      if(isLoggedIn===true){
        this._router.navigate(['/list']);
        return false;
      }
      else{
        return true;
      }
  }
}