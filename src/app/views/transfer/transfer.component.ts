import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Card } from '../../models/card.model';
import { DialogService } from '../../shared/services/dialog.service';
import { SnackBarService } from '../../shared/services/snack-bar.service';
import { ContactsComponent } from './components/contacts.component';
import { Contact } from '../../models/contact.model';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable, Subject } from 'rxjs';
import { CardsService } from '../../api/cards.service';
import { TransferService } from '../../api/transfer.service';
import { takeUntil } from 'rxjs/operators';
import { amountValidator } from '../../shared/validators/amount.validator';
import { TransferValidators } from '../../shared/validators/transfer.validators';
import { ibanValidator } from '../../shared/validators/iban.validators';
import { ContactsFacade } from "./store/contact/contacts.facade";

@Component({
  selector: 'ft-transfer',
  template: `
    <mat-card>
      <button
        mat-button color="accent"
        class="w-100 mb-4" (click)="openContact()">
        Lista contatti
      </button>

      <form [formGroup]="transferForm">
        <mat-form-field appearance="fill" class="w-100 mb-3">
          <mat-label>Nome</mat-label>
          <input matInput formControlName="name">
        </mat-form-field>

        <mat-form-field appearance="fill" class="w-100 mb-3">
          <mat-label>Surname</mat-label>
          <input matInput formControlName="surname">
        </mat-form-field>

        <mat-form-field appearance="fill" class="w-100 mb-3">
          <mat-label>IBAN</mat-label>
          <input matInput formControlName="iban">
          <mat-error *ngIf="transferForm.get('iban')?.hasError('iban')">
            L'iban non è nel formato corretto
          </mat-error>
        </mat-form-field>

        <ng-container [formGroup]="moneyGroup">
          <mat-form-field appearance="fill" class="w-100 mb-3">
            <mat-label>Importo</mat-label>
            <input matInput formControlName="amount" type="text">
          </mat-form-field>

          <mat-form-field appearance="fill" class="w-100 mb-3">
            <mat-select formControlName="card">
              <mat-option *ngFor="let card of cards$ | async" [value]="card._id">{{ card.number }}</mat-option>
              <mat-option [value]="'fake'">Carta falsa</mat-option>
            </mat-select>
            <mat-label>Seleziona carta</mat-label>
            <mat-error *ngIf="moneyGroup.get('card')?.hasError('cardId')">
              La carta inserita non è valida
            </mat-error>
          </mat-form-field>

          <mat-error *ngIf="moneyGroup.hasError('transfer')">
            Non hai abbastanza soldini nella carta
          </mat-error>
        </ng-container>

        <button
          type="button" mat-button
          [disabled]="!transferForm.valid"
          (click)="transferMoney()"
          class="w-100"
        >
          <mat-spinner [diameter]="30" class="mx-auto" *ngIf="transferForm.pending; else label"></mat-spinner>
          <ng-template #label>Trasferisci denaro</ng-template>
        </button>
      </form>
    </mat-card>
  `,
})
export class TransferComponent implements OnInit, OnDestroy {
  public cards$: Observable<Card[]> = this.cardService.getAll();
  public transferForm = this.fb.group({
    name: ['', Validators.required],
    surname: ['', Validators.required],
    iban: ['', [Validators.required, ibanValidator]],
    money: this.fb.group({
      amount: ['', [Validators.required, amountValidator]],
      card: ['', Validators.required, [this.transferValidators.cardIdValidator()]],
    }, { asyncValidators: this.transferValidators.transferValidator() })
  });

  private contacts$: Observable<Contact[]> = this.contactsFacade.contacts$;
  private destroy$ = new Subject();

  constructor(
    private fb: FormBuilder,
    private dialogService: DialogService,
    private snackBarService: SnackBarService,
    private cardService: CardsService,
    private transferService: TransferService,
    private transferValidators: TransferValidators,
    private contactsFacade: ContactsFacade
  ) {
  }

  public get moneyGroup(): FormGroup {
    return this.transferForm.get('money') as FormGroup;
  }

  public ngOnInit(): void {
    this.contactsFacade.setContacts();
  }

  public ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public transferMoney(): void {
    const dialogRef = this.dialogService.openDefaultDialog(
      {
        title: 'Sei sicuro?',
        message: `L'azione è irriversibile`,
        confirmCtaText: 'Conferma',
        rejectedCtaText: 'Annulla',
      },
    );

    dialogRef.afterClosed().subscribe((res: boolean) => {
      if (res) {
        this.transferService.transferMoney(this.transferForm.value).subscribe(() => {
          this.snackBarService.openDefaultSnackBar('Operazione avvenuta con successo!');
          this.transferForm.reset();
        });
      }
    })
  }

  public openContact(): void {
    const dialogRef: MatDialogRef<ContactsComponent> = this.dialogService.openCustomDialog(ContactsComponent);
    dialogRef.componentInstance.contacts$ = this.contacts$;

    dialogRef.componentInstance.editContact.pipe(takeUntil(this.destroy$))
      .subscribe(contact => this.contactsFacade.updateContact(contact));

    dialogRef.componentInstance.deleteContact.pipe(takeUntil(this.destroy$))
      .subscribe(contactId => this.contactsFacade.deleteContact(contactId));

    dialogRef.componentInstance.addContact.pipe(takeUntil(this.destroy$))
      .subscribe(contact => this.contactsFacade.addContact(contact));

    dialogRef.afterClosed().pipe(takeUntil(this.destroy$))
      .subscribe((selectedContactId: string) => {
        if (selectedContactId) {
          this.contacts$.pipe(takeUntil(this.destroy$))
            .subscribe(contacts => {
              const selectedContact = contacts.find(c => c._id === selectedContactId);
              selectedContact && this.transferForm.patchValue(selectedContact);
            })
        }
      });
  }
}
