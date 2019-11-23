import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CakeRoutingModule } from './cake-routing.module';
import { CakeListItemComponent } from './cake-list/cake-list-item/cake-list-item.component';
import { InactiveStarsPipe } from './cake/pipes/inactive-stars.pipe';
import { CakeComponent } from './cake/cake.component';
import { ActiveStarsPipe } from './cake/pipes/active-stars.pipe';
import { CakeListComponent } from './cake-list/cake-list.component';
import { CakeDesignComponent } from './cake-design/cake-design.component';
import { MaterialModule } from '../material/material.module';
import { SpinnerModule } from '../spinner/spinner.module';


@NgModule({
  declarations: [
    CakeDesignComponent,
    CakeListComponent,
    CakeComponent,
    ActiveStarsPipe,
    InactiveStarsPipe,
    CakeListItemComponent,
  ],
  imports: [
    SpinnerModule,
    ReactiveFormsModule,
    MaterialModule,
    CommonModule,
    CakeRoutingModule
  ],
  exports: [
  ]
})
export class CakeModule { }
