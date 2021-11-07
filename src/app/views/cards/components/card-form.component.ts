import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { CardForm } from '../../../models/card-form.model';

@Component({
  selector: 'ft-card-form',
  template: `
    <div class="p-3">
      <h2 mat-card-title>Aggiungi carta</h2>
      <form [formGroup]="cardForm">
        <mat-form-field appearance="fill" class="w-100 mb-3">
          <mat-select formControlName="cardType">
            <mat-option *ngFor="let type of cardTypes" [value]="type">
              {{ type | titlecase }}
            </mat-option>
          </mat-select>
          <mat-label>Tipo di carta</mat-label>
          <mat-error *ngIf="getFormControl('cardType').invalid">
            Inserire il tipo della carta
          </mat-error>
        </mat-form-field>

        <div class="mb-3">
          <mat-form-field appearance="fill" class="me-2">
            <mat-label>Nome</mat-label>
            <input matInput formControlName="name">
            <mat-error *ngIf="getFormControl('name').invalid">
              Il nome è richiesto
            </mat-error>
          </mat-form-field>

          <mat-form-field appearance="fill">
            <mat-label>Cognome</mat-label>
            <input matInput formControlName="surname">
            <mat-error *ngIf="getFormControl('surname').invalid">
              Il Cognome è richiesto
            </mat-error>
          </mat-form-field>
        </div>

        <mat-form-field appearance="fill" class="d-block mb-3">
          <mat-label>N° Carta</mat-label>
          <input matInput formControlName="cardNumber">
          <mat-error *ngIf="getFormControl('cardNumber').invalid">
            Il numero della carta deve avere esattamente 16 caratteri
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="fill" class="d-block mb-3">
          <mat-label>Codice di sicurezza</mat-label>
          <input matInput formControlName="secureCode">
          <mat-error *ngIf="getFormControl('secureCode').invalid">
            Il codice di sicurezza della carta deve avere esattamente 3 caratteri
          </mat-error>
        </mat-form-field>

        <button
          type="button" mat-raised-button
          color="primary" class="w-100 d-block"
          [disabled]="cardForm.invalid"
          (click)="addCard()"
        >
          Aggiungi carta
        </button>
        <button type="button" mat-button color="warn" class="w-100 d-block mt-3" (click)="resetForm()">Annulla</button>
      </form>
    </div>
  `,
  styles: [],
})
export class CardFormComponent {
  @Output() saveCard = new EventEmitter<CardForm>();
  @Output() cancelForm = new EventEmitter<void>();

  public cardTypes = ['visa', 'mastercard'];
  public cardForm = this.fb.group({
    cardType: ['', Validators.required],
    name: ['', Validators.required],
    surname: ['', Validators.required],
    cardNumber: ['', [Validators.required, Validators.minLength(16), Validators.maxLength(16)]],
    secureCode: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]],
  });

  constructor(private fb: FormBuilder) { }

  public addCard(): void {
    if (this.cardForm.valid) {
      this.saveCard.emit(this.cardForm.value);
      this.resetForm();
    }
  }

  public resetForm(): void {
    this.cardForm.reset();
    this.cancelForm.emit();
  }

  public getFormControl(key: string): FormControl {
    return this.cardForm.get(key) as FormControl;
  }
}
