import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { CakeService } from '../cake-service/cake.service';
import { Cake } from '../cake-model/cake.model';
import { Subject, Subscribable, Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/authentication/authentication-service/authentication.service';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-cake',
  templateUrl: './cake.component.html',
  styleUrls: ['./cake.component.sass']
})
export class CakeComponent implements OnInit, OnDestroy {
  public currentCake:Cake ;
  public currentUserId:string;
  public currentUserSub:Subscription = new Subscription();
  public cakeIdSub:Subscription = new Subscription();
  public cakeId:string;

  constructor(
    private cakeService:CakeService, 
    private authService:AuthenticationService, 
    private _route:ActivatedRoute,
    private _router:Router) { }

  ngOnInit() {
    this.currentUserSub = this.authService.currentUserIdSubject.subscribe(currentUserId=>{
      this.currentUserId = currentUserId;
    })

    this.cakeIdSub = this.cakeIdSub = this._route.paramMap.subscribe(params=>{
      this.cakeId = params.get('id');
      this.setCake();
    })


  }
  setCake():void{
    if(this.cakeId){
      this.cakeService.getCake(this.cakeId).subscribe(res=>{
        this.currentCake = res.cake;
      });
    }
    else{
      const error = new Error('CAKE ID IS NOT DEFINED');
      throw error;
    }
  }

  editCake():void{
    if(this.currentCake){
      this.cakeService.editPatchForm(this.currentCake);
      this._router.navigate([`design/${this.cakeId}`]);
      this.cakeId = null;
      this.currentUserId = null;
    }
    else{
      const error = new Error('NO CAKE IS LOADED');
      throw error;
    }
  }

  deleteCake():void{
    if(this.cakeIdSub){
      this.cakeService.deleteCake(this.cakeId);
      this.cakeId = null;
      this.currentUserId = null;
      this._router.navigate(['/list']);
    }
    else{
      const error = new Error('NO CAKE IS LOADED');
      throw error;
    }
  }

  

  ngOnDestroy() {
    this.currentUserSub.unsubscribe();
    this.cakeIdSub.unsubscribe()
  }


}
