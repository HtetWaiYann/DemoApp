import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
})
export class ConfirmDialogComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  title: string = 'Confirmation';
  message: string = 'Are you sure?';
  cancelButtonText: string = 'Cancel';
  confirmButtonText: string = 'Confirm';

  ngOnInit(): void {
    this.title = this.data.title || this.title;
    this.message = this.data.message || this.message;
    this.cancelButtonText = this.data.cancelButtonText || this.cancelButtonText;
    this.confirmButtonText =
      this.data.confirmButtonText || this.confirmButtonText;
  }

  dismiss() {
    this.dialogRef.close();
  }

  confirm() {
    this.dialogRef.close(true);
  }
}
