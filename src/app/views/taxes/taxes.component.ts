import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { fiscalCodeValidator } from '../../shared/validators/fiscal-code.validator';
import { inpsValidators } from '../../shared/validators/inpsValidators';
import { TaxesService } from '../../api/taxes.service';
import { SnackBarService } from '../../shared/services/snack-bar.service';
import { INPSErrorStateMatcher } from './utility/inps-error-state-matcher';
import { DialogService } from '../../shared/services/dialog.service';
import { SelectCardDialogComponent } from './components/select-card-dialog.component';
import { switchMap, tap } from 'rxjs/operators';
import { Card } from '../../models/card.model';
import { of } from 'rxjs';
import { CardsService } from '../../api/cards.service';

@Component({
  selector: 'ft-taxes',
  template: `
    <form [formGroup]="taxesForm" class="p-3" (ngSubmit)="send()">
      <ft-taxpayer [contribuente]="contribuenteForm"></ft-taxpayer>
      <div class="mt-4">
        <ft-treasury
          [taxesForm]="taxesForm"
          [erarioForm]="erario"
          (addErarioGroup)="addErario()"
          (removeErarioGroup)="removeErario($event)"
        ></ft-treasury>
      </div>
      <div class="mt-4">
        <ft-inps
          [taxesForm]="taxesForm"
          [inpsForm]="inps"
          [inpsMatcher]="inpsMatcher"
          (addInpsGroup)="addInps()"
          (removeInpsGroup)="removeInps($event)"
        ></ft-inps>
      </div>

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
  styles: [],
})
export class TaxesComponent implements OnInit {
  public taxesForm = this.fb.group({
    contribuente: this.fb.group({
      codiceFiscale: ['BLLGRL95T14G273L', [Validators.required, fiscalCodeValidator]],
      cognome: ['Bilello', [Validators.required]],
      nome: ['Gabriele', [Validators.required]],
      dataDiNascita: ['', [Validators.required]],
      sesso: ['male', [Validators.required]],
      provinciaDiNascita: ['Palermo', [Validators.required]],
      comuneDiNascita: ['Palermo', [Validators.required]],
    }),
    erario: this.fb.array([]),
    inps: this.fb.array([]),
  });
  public inpsMatcher = new INPSErrorStateMatcher();
  private cards: Card[] = [];

  constructor(
    private fb: FormBuilder,
    private taxesService: TaxesService,
    private snackBarService: SnackBarService,
    private dialogService: DialogService,
    private cardService: CardsService,
  ) {
  }

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
      codiceTributo: ['asd', [Validators.required]],
      anno: ['asd', [Validators.required]],
      debito: ['asd', [Validators.required]],
      credito: ['asd', [Validators.required]],
    });
    this.erario.push(erarioGroup);
  }

  public removeErario(index: number): void {
    this.erario.removeAt(index);
  }

  public addInps(): void {
    const inpsGroup = this.fb.group({
      codiceSede: ['asd', [Validators.required]],
      causaleContributo: ['asd', [Validators.required]],
      codiceInps: ['asd', [Validators.required]],
      da: ['', [Validators.required]],
      a: ['', [Validators.required]],
      debito: ['asd', [Validators.required]],
      credito: ['asd', [Validators.required]],
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
