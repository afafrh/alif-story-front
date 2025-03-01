import { Component, Inject, Input } from '@angular/core';
import { DialogRef } from '@angular/cdk/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-response-popup',
  templateUrl: './response-popup.component.html',
  styleUrls: ['./response-popup.component.scss'],
})
export class ResponsePopupComponent {
  constructor(
    private dialogRef: DialogRef<ResponsePopupComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { message: ''; isSuccess: false; isError: false }
  ) {}
}
