import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'ft-treasury',
  template: `
    <ng-container [formGroup]="taxesForm">
      <ng-container [formArrayName]="'erario'">
        <h1 class="mat-title">Erario</h1>

        <ng-container *ngFor="let e of erarioForm.controls; let i = index">
          <mat-grid-list cols="9" rowHeight="80px" [formGroupName]="i">
            <mat-grid-tile [colspan]="2">
              <mat-form-field appearance="fill" class="w-100 me-3">
                <mat-label>Codice Tributo</mat-label>
                <input matInput formControlName="codiceTributo">
              </mat-form-field>
            </mat-grid-tile>

            <mat-grid-tile [colspan]="2">
              <mat-form-field appearance="fill" class="w-100 me-3">
                <mat-label>Anno di riferimento</mat-label>
                <input matInput formControlName="anno">
              </mat-form-field>
            </mat-grid-tile>

            <mat-grid-tile [colspan]="2">
              <mat-form-field appearance="fill" class="w-100 me-3">
                <mat-label>Importo a debito</mat-label>
                <input matInput formControlName="debito">
              </mat-form-field>
            </mat-grid-tile>

            <mat-grid-tile [colspan]="2">
              <mat-form-field appearance="fill" class="w-100 me-3">
                <mat-label>Importo a credito</mat-label>
                <input matInput formControlName="credito">
              </mat-form-field>
            </mat-grid-tile>

            <mat-grid-tile [colspan]="1">
              <button mat-mini-fab color="warn" (click)="removeErarioGroup.emit(i)">
                <mat-icon>delete</mat-icon>
              </button>
            </mat-grid-tile>
          </mat-grid-list>
        </ng-container>

        <button mat-mini-fab color="accent" (click)="addErarioGroup.emit()">
          <mat-icon>add</mat-icon>
        </button>
      </ng-container>
    </ng-container>
  `,
  styles: [],
})
export class TreasuryComponent {
  @Input() taxesForm!: FormGroup;
  @Input() erarioForm!: FormArray;
  @Output() addErarioGroup = new EventEmitter<void>();
  @Output() removeErarioGroup = new EventEmitter<number>();
}
