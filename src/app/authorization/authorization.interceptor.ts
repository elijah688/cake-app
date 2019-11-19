import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from "@angular/common/http";
import { Observable } from 'rxjs';
import { nextTick } from 'q';

export class AuthorizationInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
       const token:string = localStorage.getItem('token');
       if(token!==null){
        const clonedReq = req.clone({
            headers: req.headers.set(
                "Authorization", token)
        });     
        return next.handle(clonedReq);
       }

       else{
        return next.handle(req);
       }
    }

  }