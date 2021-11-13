import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { fiscalCodeValidator } from '../../shared/validators/fiscal-code.validator';
import { inpsValidators } from '../../shared/validators/inpsValidators';
import { TaxesService } from '../../api/taxes.service';
import { SnackBarService } from '../../shared/services/snack-bar.service';
import { INPSErrorStateMatcher } from './utility/inps-error-state-matcher';

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
export class TaxesComponent {
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

  constructor(
    private fb: FormBuilder,
    private taxesService: TaxesService,
    private snackBarService: SnackBarService
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
      this.taxesService.addTaxes(this.taxesForm.value).subscribe(() => {
        this.taxesForm.reset();
        this.inps.clear();
        this.erario.clear();
      },
        () => this.snackBarService.openDefaultSnackBar(`C'è stato un errore, riprova`, 'chiudi'));
    }
  }
}
