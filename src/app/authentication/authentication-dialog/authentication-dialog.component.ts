import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-authentication-dialog',
  templateUrl: './authentication-dialog.component.html',
  styleUrls: ['./authentication-dialog.component.sass']
})

export class AuthenticationDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AuthenticationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string) {}

    ngOnInit() {
    }

    closeDialog(): void {
      this.dialogRef.close();
    }

}
