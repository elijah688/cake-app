import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { CakeService } from '../cake-service/cake.service';

@Component({
  selector: 'app-cake-hub',
  templateUrl: './cake-hub.component.html',
  styleUrls: ['./cake-hub.component.sass']
})
export class CakeHubComponent implements OnInit {
 

  constructor(private cakeService:CakeService) { }

  ngOnInit():void {
  }

 

 
}
