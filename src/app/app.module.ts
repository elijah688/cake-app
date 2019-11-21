import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationComponent } from './navigation/navigation.component';
import { CakeDesignComponent } from './cake/cake-design/cake-design.component';
import { CakeListComponent } from './cake/cake-list/cake-list.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { CakeComponent } from './cake/cake/cake.component';
import { ActiveStarsPipe } from './cake/cake/pipes/active-stars.pipe';
import { InactiveStarsPipe } from './cake/cake/pipes/inactive-stars.pipe';
import { AuthorizationInterceptor } from './authorization/authorization.interceptor';
import { SpinnerComponent } from './spinner/spinner.component';

import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDividerModule} from '@angular/material/divider';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { AuthenticationDialogComponent } from './authentication/authentication-dialog/authentication-dialog.component';
import { ErrorDialogComponent } from './error/error-dialog/error-dialog.component';
import { ErrorInterceptor } from './error/error-interceptor.service';
import { CakeListItemComponent } from './cake/cake-list/cake-list-item/cake-list-item.component';



@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    AuthenticationComponent,
    CakeDesignComponent,
    CakeListComponent,
    CakeComponent,
    ActiveStarsPipe,
    InactiveStarsPipe,
    SpinnerComponent,
    SnackbarComponent,
    AuthenticationDialogComponent,
    ErrorDialogComponent,
    CakeListItemComponent
  ],
  entryComponents: [
    SnackbarComponent,
    AuthenticationDialogComponent,
    ErrorDialogComponent
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
    MatDividerModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatDialogModule
  ],
  providers: [
    {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthorizationInterceptor,
    multi: true
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
  }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
