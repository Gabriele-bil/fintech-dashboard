import { Component, OnDestroy } from '@angular/core';
import {
  ControlValueAccessor,
  FormBuilder,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  Validators,
} from '@angular/forms';
import { fiscalCodeValidator } from '../../../shared/validators/fiscal-code.validator';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'ft-taxpayer',
  template: `
    <form [formGroup]="contribuenteForm">
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
    </form>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: TaxpayerComponent,
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: TaxpayerComponent,
      multi: true,
    },
  ],
})
export class TaxpayerComponent implements OnDestroy, ControlValueAccessor {
  //TODO Aggiungere validatore
  public contribuenteForm: FormGroup = this.fb.group({
    codiceFiscale: ['', [Validators.required, fiscalCodeValidator]],
    cognome: ['', [Validators.required]],
    nome: ['', [Validators.required]],
    dataDiNascita: ['', [Validators.required]],
    sesso: ['', [Validators.required]],
    provinciaDiNascita: ['', [Validators.required]],
    comuneDiNascita: ['', [Validators.required]],
  });
  public today = new Date();
  private destroy$ = new Subject<void>();

  constructor(private fb: FormBuilder) {
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
  }

  public writeValue(obj: any): void {
    this.contribuenteForm.patchValue(obj);
  }

  public setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.contribuenteForm.disable() : this.contribuenteForm.enable();
  }

  public registerOnChange(fn: any): void {
    this.contribuenteForm.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(x => fn(x))
  }

  public registerOnTouched(fn: any): void {
    this.contribuenteForm.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((() => fn()));
  }
}
