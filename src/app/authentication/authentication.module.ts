import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { AuthenticationComponent } from './authentication.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { SpinnerModule } from '../spinner/spinner.module';


@NgModule({
  declarations: [
    AuthenticationComponent,
  ],
  imports: [
    SpinnerModule,
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    AuthenticationRoutingModule
  ]
})
export class AuthenticationModule { }
