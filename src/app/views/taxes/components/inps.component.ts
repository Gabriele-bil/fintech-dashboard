import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { INPSErrorStateMatcher } from '../utility/inps-error-state-matcher';
import { TotalsInput } from '../../../models/totals-input.model';

@Component({
  selector: 'ft-inps',
  template: `
    <ng-container [formGroup]="taxesForm">
      <ng-container [formArrayName]="'inps'">
        <h1 class="mat-title">INPS</h1>

        <ng-container *ngFor="let inps of inpsForm.controls; let i = index">
          <mat-grid-list cols="15" rowHeight="80px" [formGroupName]="i">
            <mat-grid-tile [colspan]="2">
              <mat-form-field appearance="fill" class="w-100 me-3">
                <mat-label>Codice Sede</mat-label>
                <input matInput formControlName="codiceSede">
              </mat-form-field>
            </mat-grid-tile>

            <mat-grid-tile [colspan]="2">
              <mat-form-field appearance="fill" class="w-100 me-3">
                <mat-label>Causale Contributo</mat-label>
                <input matInput formControlName="causaleContributo">
              </mat-form-field>
            </mat-grid-tile>

            <mat-grid-tile [colspan]="2">
              <mat-form-field appearance="fill" class="w-100 me-3">
                <mat-label>Codice INPS</mat-label>
                <input matInput formControlName="codiceInps">
              </mat-form-field>
            </mat-grid-tile>

            <mat-grid-tile [colspan]="2">
              <mat-form-field appearance="fill" class="w-100 me-3">
                <mat-label>Da</mat-label>
                <input matInput [matDatepicker]="pickerFrom" formControlName="da" [errorStateMatcher]="inpsMatcher">
                <mat-datepicker-toggle matSuffix [for]="pickerFrom"></mat-datepicker-toggle>
                <mat-datepicker #pickerFrom></mat-datepicker>
              </mat-form-field>
            </mat-grid-tile>

            <mat-grid-tile [colspan]="2">
              <mat-form-field appearance="fill" class="w-100 me-3">
                <mat-label>A</mat-label>
                <input matInput [matDatepicker]="pickerTo" formControlName="a" [errorStateMatcher]="inpsMatcher">
                <mat-datepicker-toggle matSuffix [for]="pickerTo"></mat-datepicker-toggle>
                <mat-datepicker #pickerTo></mat-datepicker>
              </mat-form-field>
            </mat-grid-tile>

            <mat-grid-tile [colspan]="2">
              <mat-form-field appearance="fill" class="w-100 me-3">
                <mat-label>Debito</mat-label>
                <input matInput formControlName="debito">
              </mat-form-field>
            </mat-grid-tile>

            <mat-grid-tile [colspan]="2">
              <mat-form-field appearance="fill" class="w-100 me-3">
                <mat-label>Credito</mat-label>
                <input matInput formControlName="credito">
              </mat-form-field>
            </mat-grid-tile>

            <mat-grid-tile [colspan]="1">
              <button mat-mini-fab color="warn" (click)="removeInpsGroup.emit(i)">
                <mat-icon>delete</mat-icon>
              </button>
            </mat-grid-tile>
          </mat-grid-list>

          <mat-error class="mb-3" *ngIf="inpsForm.get(i.toString())?.errors">
            {{ inpsForm.get(i.toString())?.errors?.inps }}
          </mat-error>
        </ng-container>

        <mat-grid-list cols="15" rowHeight="30px" *ngIf="totaliInps && inpsForm.controls.length">
          <mat-grid-tile [colspan]="10"></mat-grid-tile>
          <mat-grid-tile [colspan]="2">Totale a debito: {{ totaliInps.debito | currency:'EUR' }}</mat-grid-tile>
          <mat-grid-tile [colspan]="2">Totale a credito: {{ totaliInps.credito | currency:'EUR' }}</mat-grid-tile>
          <mat-grid-tile [colspan]="1"></mat-grid-tile>
        </mat-grid-list>

        <button mat-mini-fab color="accent" (click)="addInpsGroup.emit()">
          <mat-icon>add</mat-icon>
        </button>
      </ng-container>
    </ng-container>
  `,
  styles: [],
})
export class InpsComponent {
  @Input() taxesForm!: FormGroup;
  @Input() inpsForm!: FormArray;
  @Input() totaliInps: TotalsInput | null = null;
  @Input() inpsMatcher: INPSErrorStateMatcher = new INPSErrorStateMatcher();
  @Output() addInpsGroup = new EventEmitter<void>();
  @Output() removeInpsGroup = new EventEmitter<number>();
}
