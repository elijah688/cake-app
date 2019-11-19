import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup, NgForm } from '@angular/forms';
import { CakeService } from '../cake-service/cake.service';
import { Cake } from '../cake-model/cake.model';
import { Subscription } from 'rxjs';
import { TitleCasePipe } from '@angular/common';
import { mimeType } from './validators/mime-type.validator';

@Component({
  selector: 'app-cake-design',
  templateUrl: './cake-design.component.html',
  styleUrls: ['./cake-design.component.sass']
})
export class CakeDesignComponent implements OnInit, OnDestroy {
  public id:string;
  public stars:boolean[] = [false, false, false, false, false];
  public imgUrl:string;
  public creator:string;
  public cakeForm = this.fb.group({
    title: ['',[Validators.required]],
    comment: ['',[Validators.required]],
    image: [null, [Validators.required], [mimeType]]
  });
   
  @ViewChild('myForm', {static: false}) myform: NgForm;

  public isEditing: boolean = false;
  public patchCakeSub:Subscription = new Subscription();
  public imageButtonTouched:boolean = false;

  constructor(
    private fb: FormBuilder,
    private cakeService:CakeService
    ) { }

  ngOnInit() {
    this.patchCakeSub = this.cakeService.patchCakeSubject.subscribe(cake=>{
     this.patchValuesOnEdit(cake);
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
    if(index===0 && this.stars[1]===false){
      this.stars[0] = !this.stars[0];
    }
    if(index!==0 && this.stars[index-1]===true && this.stars[index+1]===false){
      this.stars[index] = !this.stars[index];
    }

    if(index===4 && this.stars[3]===true){
      this.stars[4] = !this.stars[4];
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
        image: file,
        stars: this.stars,
        creator: this.creator
      }
  
      this.cakeService.addCake(cake);

      this.id = undefined;
      this.imgUrl = undefined;
      this.stars = Array(5).fill(false);;
      this.imageButtonTouched = false;
      this.cakeForm.reset();
      this.myform.resetForm();
      this.creator = undefined;
    }
   
  }

  patchValuesOnEdit(cake:Cake){
    const id:string = cake.id;
    const title:string = cake.title;
    const comment: string = cake.comment;
    const imagePath: string | File = cake.image;
    const stars: boolean[] = cake.stars;
    const creator:string = cake.creator;

    this.id = id;
    this.cakeForm.patchValue({title: title, comment: comment, image: imagePath});
    this.stars = stars;
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
      const stars: boolean[] = this.stars;
      let image: string | File; 
      if(imageForm===undefined){
        image = this.imgUrl;
      }
      else{
        image = imageForm;
      }
  
      const cake:Cake = {id:id, title:title, comment:comment, image:image, stars:stars, creator:this.creator}
      this.cakeService.editCake(cake);
  

      this.id = undefined;
      this.imgUrl = undefined;
      this.stars = Array(5).fill(false);
      this.imageButtonTouched = false;
      this.isEditing= false;
      this.cakeForm.reset();
      this.myform.resetForm();
      this.creator = undefined;
    }
    
  }


}
