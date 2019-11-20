import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthenticationDialogComponent } from 'src/app/authentication/authentication-dialog/authentication-dialog.component';

@Component({
  selector: 'app-error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.sass']
})
export class ErrorDialogComponent implements OnInit {
  
  constructor(
    public dialogRef: MatDialogRef<AuthenticationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string) {}

    ngOnInit() {
    }

    closeDialog(): void {
      this.dialogRef.close();
    }
}
