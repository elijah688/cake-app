import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationComponent } from './navigation/navigation.component';
import { CakeDesignComponent } from './cake/cake-design/cake-design.component';
import { CakeListComponent } from './cake/cake-list/cake-list.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { CakeComponent } from './cake/cake/cake.component';

import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDividerModule} from '@angular/material/divider';
import { CakeHubComponent } from './cake/cake-hub/cake-hub.component';
import { ActiveStarsPipe } from './cake/cake/pipes/active-stars.pipe';
import { InactiveStarsPipe } from './cake/cake/pipes/inactive-stars.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    AuthenticationComponent,
    CakeDesignComponent,
    CakeListComponent,
    CakeComponent,
    CakeHubComponent,
    ActiveStarsPipe,
    InactiveStarsPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,

    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
