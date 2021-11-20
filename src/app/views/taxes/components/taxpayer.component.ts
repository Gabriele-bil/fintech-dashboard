import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { Comune } from '../../../models/comuni.model';
import { debounceTime, distinctUntilChanged, map, takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { fiscalCodeValidator } from '../../../shared/validators/fiscal-code.validator';

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
        <input matInput formControlName="provinciaDiNascita" [matAutocomplete]="prov">
        <mat-autocomplete #prov="matAutocomplete">
          <ng-container *ngIf="filteredProvince$ | async as filteredProvince">
            <mat-option *ngFor="let option of filteredProvince" [value]="option">
              {{ option }}
            </mat-option>
          </ng-container>
        </mat-autocomplete>
      </mat-form-field>

      <mat-form-field appearance="fill" class="w-100 mb-3">
        <mat-label>Comune di nascita</mat-label>
        <input matInput formControlName="comuneDiNascita" [matAutocomplete]="com">
        <mat-autocomplete #com="matAutocomplete">
          <ng-container *ngIf="filteredComuni$ | async as filteredComuni">
            <mat-option *ngFor="let option of filteredComuni" [value]="option">
              {{ option }}
            </mat-option>
          </ng-container>
        </mat-autocomplete>
      </mat-form-field>
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: TaxpayerComponent,
      multi: true,
    },
  ],
})
export class TaxpayerComponent implements OnInit, OnDestroy, ControlValueAccessor {
  @Input() comuni: Comune[] | null = [];
  // TODO aggiungere validator
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
  public filteredProvince$!: Observable<string[]> | undefined;
  public filteredComuni$!: Observable<string[]> | undefined;
  private destroy$ = new Subject<void>();

  constructor(private fb: FormBuilder) {
  }

  public ngOnInit(): void {
    // TODO Da rivedere, usando combine latest, creare una pipe (?)
    this.filteredProvince$ = this.contribuenteForm.get('provinciaDiNascita')?.valueChanges.pipe(
      distinctUntilChanged(),
      debounceTime(500),
      map(val => {
        const province = [...new Set(this.comuni?.map(c => c.provincia.nome))];
        return province?.filter(c => c.toLowerCase().includes(val.toLowerCase())) || []
      }),
    );

    this.filteredComuni$ = this.contribuenteForm.get('comuneDiNascita')?.valueChanges.pipe(
      distinctUntilChanged(),
      debounceTime(500),
      map(val => {
        const selectedProvincia: string = this.contribuenteForm.get('provinciaDiNascita')?.value;
        return this.comuni
          ?.filter(c => c.provincia.nome === selectedProvincia)
          .filter(c => c.nome.toLowerCase().includes(val.toLowerCase()))
          .map(c => c.nome) || [];
      }),
    );
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

  /* public validate(control: AbstractControl): ValidationErrors | null {
     console.log(control);
    return null;
   }*/
}
