import { NgModule } from '@angular/core';

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

import { ErrorDialogComponent } from '../error/error-dialog/error-dialog.component';
import { AuthenticationDialogComponent } from '../authentication/authentication-dialog/authentication-dialog.component';
import { SnackbarComponent } from '../snackbar/snackbar.component';

@NgModule({
  declarations: [
    SnackbarComponent,
    AuthenticationDialogComponent,
    ErrorDialogComponent,
  ],
  imports:[ 
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
  exports: [
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
  entryComponents: [
    SnackbarComponent,
    AuthenticationDialogComponent,
    ErrorDialogComponent
  ],
 
})
export class MaterialModule { }
