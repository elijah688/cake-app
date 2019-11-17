import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CakeService } from '../cake-service/cake.service';
import { Cake } from '../cake-model/cake.model';

@Component({
  selector: 'app-cake-design',
  templateUrl: './cake-design.component.html',
  styleUrls: ['./cake-design.component.sass']
})
export class CakeDesignComponent implements OnInit {
  public stars:boolean[] = [false, false, false, false, false];
  public imgUrl:string;
  public cakeForm = this.fb.group({
    title: [''],
    comment: [''],
    image: [null]
  });
   

  constructor(
    private fb: FormBuilder,
    private cakeService:CakeService
    ) { }

  ngOnInit() {
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
    const title:string = this.cakeForm.get('title').value;
    const comment:string = this.cakeForm.get('comment').value;
    const imagePath:string = this.imgUrl;

    const cake: Cake = {
      title: title,
      comment: comment,
      imagePath: imagePath,
      stars: this.stars
    }

    this.cakeService.addCake(cake);
  }


}
