import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Card } from '../../models/card.model';
import { DialogService } from '../../shared/services/dialog.service';
import { SnackBarService } from '../../shared/services/snack-bar.service';
import { ContactsComponent } from './components/contacts.component';
import { Contact } from '../../models/contact.model';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable, Subject } from 'rxjs';
import { CardsService } from '../../api/cards.service';
import { ContactsService } from '../../api/contacts.service';
import { TransferService } from '../../api/transfer.service';
import { switchMap, takeUntil } from 'rxjs/operators';
import { amountValidator } from '../../shared/validators/amount.validator';

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
        <mat-form-field appearance="fill" class="w-100">
          <mat-label>Nome</mat-label>
          <input matInput formControlName="name">
        </mat-form-field>

        <mat-form-field appearance="fill" class="w-100">
          <mat-label>Surname</mat-label>
          <input matInput formControlName="surname">
        </mat-form-field>

        <mat-form-field appearance="fill" class="w-100">
          <mat-label>IBAN</mat-label>
          <input matInput formControlName="iban">
        </mat-form-field>

        <mat-form-field appearance="fill" class="w-100">
          <mat-label>Importo</mat-label>
          <input matInput formControlName="amount" type="text">
        </mat-form-field>

        <mat-form-field appearance="fill" class="w-100">
          <mat-select formControlName="card">
            <mat-option *ngFor="let card of cards$ | async" [value]="card._id">{{ card.number }}</mat-option>
          </mat-select>
          <mat-label>Seleziona carta</mat-label>
        </mat-form-field>

        <button
          type="button" mat-button
          [disabled]="transferForm.invalid"
          (click)="transferMoney()"
          class="w-100">
          Trasferisci denaro
        </button>
      </form>
    </mat-card>
  `,
})
export class TransferComponent implements OnInit, OnDestroy {
  public cards$: Observable<Card[]> | null = null;
  public contacts: Contact[] = [];
  public transferForm = this.fb.group({
    name: ['', Validators.required],
    surname: ['', Validators.required],
    iban: ['', Validators.required],
    amount: ['', [Validators.required, amountValidator]],
    card: ['', Validators.required],
  });
  private destroy$ = new Subject();

  constructor(
    private fb: FormBuilder,
    private dialogService: DialogService,
    private snackBarService: SnackBarService,
    private cardService: CardsService,
    private contactService: ContactsService,
    private transferService: TransferService,
  ) { }

  public ngOnInit(): void {
    this.cards$ = this.cardService.getAll();
    this.getContacts();
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
    dialogRef.componentInstance.contacts = this.contacts;

    this.deleteContact(dialogRef);
    this.editContact(dialogRef);
    this.addContact(dialogRef);
    this.selectContact(dialogRef);
  }

  private getContacts(dialogRef?: MatDialogRef<ContactsComponent>): void {
    this.contactService.getAll().subscribe(contacts => {
      this.contacts = contacts;
      dialogRef && this.refreshDialog(dialogRef);
    });
  }

  private editContact(dialogRef: MatDialogRef<ContactsComponent>): void {
    dialogRef.componentInstance.editContact.pipe(
      switchMap(contact => this.contactService.updateContact(contact)),
      takeUntil(this.destroy$),
    ).subscribe(() => this.getContacts(dialogRef));
  }

  private deleteContact(dialogRef: MatDialogRef<ContactsComponent>): void {
    dialogRef.componentInstance.deleteContact.pipe(
      switchMap(contactId => this.contactService.deleteContact(contactId)),
      takeUntil(this.destroy$),
    ).subscribe(() => this.getContacts(dialogRef));
  }

  private addContact(dialogRef: MatDialogRef<ContactsComponent>): void {
    dialogRef.componentInstance.addContact.pipe(
      switchMap(contact => this.contactService.addContact(contact)),
      takeUntil(this.destroy$),
    ).subscribe(() => this.getContacts(dialogRef))
  }

  private selectContact(dialogRef: MatDialogRef<ContactsComponent>): void {
    dialogRef.afterClosed().pipe(
      takeUntil(this.destroy$),
    ).subscribe((selectedContactId: string) => {
      if (selectedContactId) {
        const selectedContact = this.contacts.find(c => c._id === selectedContactId);
        selectedContact && this.transferForm.patchValue(selectedContact);
      }
    });
  }

  private refreshDialog(dialogRef: MatDialogRef<ContactsComponent>): void {
    dialogRef.componentInstance.contacts = this.contacts;
    dialogRef.componentInstance.showList = true;
    dialogRef.componentInstance.refreshTemplate();
  }
}
