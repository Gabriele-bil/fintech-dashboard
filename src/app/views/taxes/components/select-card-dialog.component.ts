import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Card } from '../../../models/card.model';

@Component({
  selector: 'ft-select-card-dialog',
  template: `
    <h1 mat-dialog-title>Seleziona carta per il pagamento</h1>
    <mat-form-field appearance="fill" class="w-100">
      <mat-label>Seleziona una carta</mat-label>
      <mat-select>
        <mat-option *ngFor="let card of cards" [value]="card._id" [mat-dialog-close]="card._id">
          {{ card.number }}
        </mat-option>
      </mat-select>
    </mat-form-field>
    <div class="w-100 d-flex justify-content-center">
      <button mat-raised-button color="warn" mat-dialog-close>
        Annulla
      </button>
    </div>
  `,
  styles: [
  ]
})
export class SelectCardDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public cards: Card[]) { }
}
