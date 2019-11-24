import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Cake } from '../cake-model/cake.model';
import { CakeService, PageOptions } from '../cake-service/cake.service';
import { Subscription } from 'rxjs';
import {  PageEvent } from '@angular/material/paginator';
import { CakeSocketService } from '../cake-socket-service/cake-socket.service';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-cake-list',
  templateUrl: './cake-list.component.html',
  styleUrls: ['./cake-list.component.sass']
})
export class CakeListComponent implements OnInit, OnDestroy {

  public cakesSubscription:Subscription = new Subscription();
  public socketSub:Subscription = new Subscription();

  public cakes: Cake[] = [];

  public length:number = 100
  public pageSize:number = 2;
  public currentPage:number = 1;
  public pageSizeOptions:number[] = [1, 2, 5, 10];
  public loading:boolean = true;

  constructor(private cakeService:CakeService, private cakeSocketServ:CakeSocketService) { }

  ngOnInit() {
    const pageOptions:PageOptions ={currentPage:1, pageSize: 2}
    this.cakeService.pageOptionsSubject.next(pageOptions);

    this.cakeService.getCakes();
    this.cakesSubscription = this.cakeService.cakesSubject.subscribe(cakeData=>{
      this.loading = false;
      this.cakes = cakeData.cakes;
      this.length = cakeData.count;
    })

    this.socketSub = this.cakeSocketServ.onSocketBroadcast().subscribe(()=>{
     
      this.cakeService.getCakes();
    })


  }

  ngOnDestroy(): void {
    this.cakesSubscription.unsubscribe();
    this.socketSub.unsubscribe();
  }



  setPaginatorOptions(event:PageEvent){
    const length: number = event.length;
    const pageSize: number = event.pageSize;
    const currentPage: number = event.pageIndex + 1;

    const pageOptions:PageOptions ={currentPage:currentPage, pageSize: pageSize}
    this.pageSize = pageSize;
    this.length = length;
    this.currentPage = currentPage;

    this.cakeService.pageOptionsSubject.next(pageOptions);
    
  }

}
