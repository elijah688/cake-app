import { Injectable } from '@angular/core';
import openSocket from 'socket.io-client';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cake } from '../cake-model/cake.model';

const SOCKET_URL:string = environment.socketUrl;

@Injectable({
  providedIn: 'root'
})
export class CakeSocketService {
  private io = openSocket(SOCKET_URL);

  constructor() { }

  onSocketBroadcast():Observable<Cake>{
    return Observable.create(observer=>{
      this.io.on('cake', ()=>{
        observer.next();
      });
    });
  }

}
