import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { fiscalCodeValidator } from '../../shared/validators/fiscal-code.validator';
import { inpsValidators } from '../../shared/validators/inpsValidators';
import { TaxesService } from '../../api/taxes.service';
import { SnackBarService } from '../../shared/services/snack-bar.service';
import { INPSErrorStateMatcher } from './utility/inps-error-state-matcher';
import { DialogService } from '../../shared/services/dialog.service';
import { SelectCardDialogComponent } from './components/select-card-dialog.component';
import { debounceTime, map, switchMap, tap } from 'rxjs/operators';
import { Card } from '../../models/card.model';
import { combineLatest, Observable, of } from 'rxjs';
import { CardsService } from '../../api/cards.service';
import { TotalsInput } from '../../models/totals-input.model';

@Component({
  selector: 'ft-taxes',
  template: `
    <form [formGroup]="taxesForm" class="p-3" (ngSubmit)="send()">
      <ft-taxpayer [contribuente]="contribuenteForm"></ft-taxpayer>
      <div class="my-4">
        <ft-treasury
          [taxesForm]="taxesForm"
          [erarioForm]="erario"
          [totaliErario]="totaliErario$ | async"
          (addErarioGroup)="addErario()"
          (removeErarioGroup)="removeErario($event)"
        ></ft-treasury>
      </div>
      <div class="my-4">
        <ft-inps
          [taxesForm]="taxesForm"
          [inpsForm]="inps"
          [totaliInps]="totaliInps$ | async"
          [inpsMatcher]="inpsMatcher"
          (addInpsGroup)="addInps()"
          (removeInpsGroup)="removeInps($event)"
        ></ft-inps>
      </div>

      <h2>Saldo Totale: {{ totale$ | async | currency: 'EUR' }}</h2>

      <button
        class="w-100 mt-5"
        type="submit"
        mat-raised-button
        color="primary"
        [disabled]="!taxesForm.valid || !erario.controls.length || !inps.controls.length ">
        Invia
      </button>
    </form>
  `,
})
export class TaxesComponent implements OnInit {
  public taxesForm = this.fb.group({
    contribuente: this.fb.group({
      codiceFiscale: ['', [Validators.required, fiscalCodeValidator]],
      cognome: ['', [Validators.required]],
      nome: ['', [Validators.required]],
      dataDiNascita: ['', [Validators.required]],
      sesso: ['', [Validators.required]],
      provinciaDiNascita: ['', [Validators.required]],
      comuneDiNascita: ['', [Validators.required]],
    }),
    erario: this.fb.array([]),
    inps: this.fb.array([]),
  });
  public inpsMatcher = new INPSErrorStateMatcher();
  private cards: Card[] = [];

  public totaliErario$: Observable<TotalsInput> = this.erario.valueChanges.pipe(
    debounceTime(1000),
    map((values: TotalsInput[]) => (
      {
        debito: values.reduce((acc, curr) => acc + +curr.debito, 0),
        credito: values.reduce((acc, curr) => acc + +curr.credito, 0),
      }),
    ),
  );

  public totaliInps$: Observable<TotalsInput> = this.inps.valueChanges.pipe(
    debounceTime(1000),
    map((values: TotalsInput[]) => (
      {
        debito: values.reduce((acc, curr) => acc + +curr.debito, 0),
        credito: values.reduce((acc, curr) => acc + +curr.credito, 0),
      }),
    ),
  );

  public totale$: Observable<number> = combineLatest([this.totaliErario$, this.totaliInps$]).pipe(
    map(([erario, inps]) => (erario.credito + inps.credito) - (erario.debito + inps.debito)),
  );

  constructor(
    private fb: FormBuilder,
    private taxesService: TaxesService,
    private snackBarService: SnackBarService,
    private dialogService: DialogService,
    private cardService: CardsService,
  ) { }

  public get contribuenteForm(): FormGroup {
    return this.taxesForm.get('contribuente') as FormGroup;
  }

  public get erario(): FormArray {
    return this.taxesForm.get('erario') as FormArray;
  }

  public get inps(): FormArray {
    return this.taxesForm.get('inps') as FormArray;
  }

  public ngOnInit(): void {
    this.cardService.getAll().subscribe(cards => this.cards = cards);
  }

  public addErario(): void {
    const erarioGroup = this.fb.group({
      codiceTributo: ['', [Validators.required]],
      anno: ['', [Validators.required]],
      debito: ['', [Validators.required]],
      credito: ['', [Validators.required]],
    });
    this.erario.push(erarioGroup);
  }

  public removeErario(index: number): void {
    this.erario.removeAt(index);
  }

  public addInps(): void {
    const inpsGroup = this.fb.group({
      codiceSede: ['', [Validators.required]],
      causaleContributo: ['', [Validators.required]],
      codiceInps: ['', [Validators.required]],
      da: ['', [Validators.required]],
      a: ['', [Validators.required]],
      debito: ['', [Validators.required]],
      credito: ['', [Validators.required]],
    }, { validators: [inpsValidators] });
    this.inps.push(inpsGroup);
  }

  public removeInps(index: number): void {
    this.inps.removeAt(index);
  }

  public send(): void {
    if (this.taxesForm.valid && this.erario.controls.length && this.inps.controls.length) {
      const dialogRef = this.dialogService.openCustomDialog(SelectCardDialogComponent, [...this.cards]);
      dialogRef.afterClosed().pipe(
        tap(result => console.log(result)),
        switchMap((result: Card) =>
          (result)
          ? this.taxesService.addTaxes(this.taxesForm.value)
          : of(null),
        ),
      ).subscribe((res) => {
          if (res) {
            this.taxesForm.reset();
            this.inps.clear();
            this.erario.clear();
          }
        },
        () => this.snackBarService.openDefaultSnackBar(`C'è stato un errore, riprova`, 'chiudi'));
    }
  }
}
