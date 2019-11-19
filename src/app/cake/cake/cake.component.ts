import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { CakeService } from '../cake-service/cake.service';
import { Cake } from '../cake-model/cake.model';
import { Subject, Subscribable, Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/authentication/authentication-service/authentication.service';

@Component({
  selector: 'app-cake',
  templateUrl: './cake.component.html',
  styleUrls: ['./cake.component.sass']
})
export class CakeComponent implements OnInit, OnDestroy {
  @Input() public id:string;
  @Input() public title:string;
  @Input() public comment:string;
  @Input() public stars:boolean[];
  @Input() public imagePath:string;
  @Input() public creator:string;
  public currentUserId:string;
  public currentUserSub:Subscription = new Subscription();
  

  constructor(private cakeService:CakeService, private authService:AuthenticationService) { }

  ngOnInit() {
    this.currentUserSub = this.authService.currentUserIdSubject.subscribe(currentUserId=>{
      this.currentUserId = currentUserId;
    })

  }

  editCake():void{
    const cake:Cake = {
      id:this.id,
      title:this.title,
      comment: this.comment,
      image: this.imagePath,
      stars: this.stars,
      creator:this.creator
    }
    this.cakeService.editPatchForm(cake);
  }

  deleteCake():void{
    this.cakeService.deleteCake(this.id);
  }

  ngOnDestroy() {
    this.currentUserSub.unsubscribe()
  }


}
