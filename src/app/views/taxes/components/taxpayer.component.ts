import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'ft-taxpayer',
  template: `
    <ng-container [formGroup]="contribuente">
      <h1 class="mat-title">Contribuente</h1>

      <mat-form-field appearance="fill" class="w-100 mb-3">
        <mat-label>Codice Fiscale</mat-label>
        <input matInput formControlName="codiceFiscale">
      </mat-form-field>

      <mat-form-field appearance="fill" class="w-100 mb-3">
        <mat-label>Cognome</mat-label>
        <input matInput formControlName="cognome">
      </mat-form-field>

      <mat-form-field appearance="fill" class="w-100 mb-3">
        <mat-label>Nome</mat-label>
        <input matInput formControlName="nome">
      </mat-form-field>

      <mat-form-field appearance="fill" class="w-100 mb-3">
        <mat-label>Data di nascita</mat-label>
        <input matInput [matDatepicker]="picker" formControlName="dataDiNascita" [max]="today">
        <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
        <mat-datepicker #picker></mat-datepicker>
      </mat-form-field>

      <mat-form-field appearance="fill" class="w-100 mb-3">
        <mat-label>Sesso</mat-label>
        <mat-select formControlName="sesso">
          <mat-option [value]="'male'">Uomo</mat-option>
          <mat-option [value]="'female'">Donna</mat-option>
          <mat-option [value]="'other'">Altro</mat-option>
        </mat-select>
      </mat-form-field>

      <mat-form-field appearance="fill" class="w-100 mb-3">
        <mat-label>Provincia di nascita</mat-label>
        <input matInput formControlName="provinciaDiNascita">
      </mat-form-field>

      <mat-form-field appearance="fill" class="w-100 mb-3">
        <mat-label>Comune di nascita</mat-label>
        <input matInput formControlName="comuneDiNascita">
      </mat-form-field>
    </ng-container>
  `,
  styles: [],
})
export class TaxpayerComponent {
  @Input() contribuente!: FormGroup;
  public today = new Date();
}
