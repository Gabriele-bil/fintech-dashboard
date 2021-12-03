import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../../models/dialog-data.model';

@Component({
  selector: 'ft-dialog',
  template: `
    <h1 mat-dialog-title>{{ data.title }}</h1>
    <p mat-dialog-content class="p-0">{{ data.message }}</p>

    <div mat-dialog-actions class="d-flex justify-content-between">
      <button mat-button color="warn" [mat-dialog-close]="false">{{ data.rejectedCtaText }}</button>
      <button mat-button color="primary" [mat-dialog-close]="true">{{ data.confirmCtaText }}</button>
    </div>

  `,
  styles: [],
})
export class DialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) { }
}
