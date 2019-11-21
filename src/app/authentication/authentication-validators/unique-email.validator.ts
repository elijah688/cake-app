import { AbstractControl, AsyncValidator, Validators, ValidationErrors } from '@angular/forms';
import { AuthenticationService } from '../authentication-service/authentication.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';


export const uniqueEmail = (authServ:AuthenticationService) => {
    return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
        return authServ.isEmailUnique(control.value).pipe(map(res => {
<<<<<<< HEAD
            console.log(res)
=======
            
>>>>>>> d2acb74c14608692b5d8215548cd14ff5d8d262c
            return res.isUnique  ? null : { emailTaken: true };
         }));
    }
}