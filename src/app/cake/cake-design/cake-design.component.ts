import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup, NgForm } from '@angular/forms';
import { CakeService } from '../cake-service/cake.service';
import { Cake } from '../cake-model/cake.model';
import { Subscription } from 'rxjs';
import { mimeType } from './validators/mime-type.validator';
import { MyErrorStateMatcher } from 'src/app/error-state-matcher/error-state-matcher';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cake-design',
  templateUrl: './cake-design.component.html',
  styleUrls: ['./cake-design.component.sass']
})
export class CakeDesignComponent implements OnInit, OnDestroy {
  public id:string;
  public yumFactor:boolean[] = [true, false, false, false, false];
  public imgUrl:string;
  public creator:string;
  public cakeForm = this.fb.group({
    title: ['',[Validators.required]],
    comment: ['',[Validators.required]],
    image: [null, [Validators.required], [mimeType]]
  });
   
  public isEditing: boolean = false;
  public patchCakeSub:Subscription = new Subscription();
  private _errorStateMatcher:MyErrorStateMatcher = new MyErrorStateMatcher();

  constructor(
    private fb: FormBuilder,
    private cakeService:CakeService,
    private _router:Router
    ) { }

  ngOnInit() {
    console.log('ININITED')
    this.patchCakeSub = this.cakeService.patchCakeSubject.subscribe(cake=>{
      console.log('cake')
      if(cake){
        this.patchValuesOnEdit(cake);
      }
    })
  }


  previewFile(event:Event):void {

    const file = (event.target as HTMLInputElement).files[0];

    if(file!==undefined){
      this.cakeForm.patchValue({image:file});
      this.cakeForm.get('image').updateValueAndValidity();

      const reader = new FileReader();

      reader.onload = () =>{
        this.imgUrl = (reader.result as string);
      }
      reader.readAsDataURL(file);
    }
  }


  toggleStar(index:number):void{
    if(index!==0 && this.yumFactor[index-1]===true && this.yumFactor[index+1]===false){
      this.yumFactor[index] = !this.yumFactor[index];
    }

    if(index===4 && this.yumFactor[3]===true){
      this.yumFactor[4] = !this.yumFactor[4];
    }
  }


  addCake(){
    if(this.cakeForm.valid===true){
      const title:string = this.cakeForm.get('title').value;
      const comment:string = this.cakeForm.get('comment').value;
      const file:string = this.cakeForm.get('image').value;
  
      const cake: Cake = {
        title: title,
        comment: comment,
        imagePath: file,
        yumFactor: this.yumFactor,
        creator: this.creator
      }
  
      this.cakeService.addCake(cake);

      this.id = undefined;
      this.imgUrl = undefined;
      this.yumFactor = [true,false,false,false,false];
      this.cakeForm.reset();
      this.creator = undefined;
      this._router.navigate(['list']);
    }
   
  }

  patchValuesOnEdit(cake:Cake){
    const id:string = cake.id;
    const title:string = cake.title;
    const comment: string = cake.comment;
    const imagePath: string | File = cake.imagePath;
    const yumFactor: boolean[] = cake.yumFactor;
    const creator:string = cake.creator;

    this.id = id;
    this.cakeForm.patchValue({title: title, comment: comment, image: imagePath});
    this.yumFactor = yumFactor;
    this.imgUrl = (imagePath as string);
    this.creator = creator;

    this.isEditing = true;
  }

  ngOnDestroy(){
    this.patchCakeSub.unsubscribe();
  }

  editCake(){
    if(this.cakeForm.valid===true){
      let id:string = this.id; 
      const title: string = this.cakeForm.get("title").value;
      const comment:string = this.cakeForm.get("comment").value;
      const imageForm: File = this.cakeForm.get('image').value;
      const yumFactor: boolean[] = this.yumFactor;
      let imagePath: string | File; 
      if(imageForm===undefined){
        imagePath = this.imgUrl;
      }
      else{
        imagePath = imageForm;
      }
  
      const cake:Cake = {id:id, title:title, comment:comment, imagePath:imagePath, yumFactor:yumFactor, creator:this.creator}
      this.cakeService.editCake(cake);

      this.id = undefined;
      this.imgUrl = undefined;
      this.yumFactor = [true,false,false,false,false];
      this.isEditing= false;
      this.cakeForm.reset();
      this.creator = undefined;
    }
    
  }

}
