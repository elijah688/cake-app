import { Component, OnInit, OnDestroy } from '@angular/core';
import { Cake } from '../cake-model/cake.model';
import { CakeService } from '../cake-service/cake.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cake-list',
  templateUrl: './cake-list.component.html',
  styleUrls: ['./cake-list.component.sass']
})
export class CakeListComponent implements OnInit, OnDestroy {
  

  public cakesSubscription:Subscription = new Subscription();
  public cakes: Cake[] = [];

  constructor(private cakeService:CakeService) { }

  ngOnInit() {
    this.cakeService.getCakes();
    this.cakesSubscription = this.cakeService.cakesSubject.subscribe(cakes=>{
      this.cakes = cakes;
    })

  }

  ngOnDestroy(): void {
    this.cakesSubscription.unsubscribe();
  }

}
