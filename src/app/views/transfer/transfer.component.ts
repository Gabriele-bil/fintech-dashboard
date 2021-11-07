import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MOCK_CARDS } from '../../shared/mock-data/mock-cards';
import { Card } from '../../models/card.model';
import { DialogService } from '../../shared/services/dialog.service';
import { SnackBarService } from '../../shared/services/snack-bar.service';
import { ContactsComponent } from './components/contacts.component';
import { MOCK_CONTACTS } from '../../shared/mock-data/mock-contacts';
import { Contact } from '../../models/contact.model';
import { MatDialogRef } from '@angular/material/dialog';

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
          <input matInput formControlName="amount" type="number">
        </mat-form-field>

        <mat-form-field appearance="fill" class="w-100">
          <mat-select formControlName="card">
            <mat-option *ngFor="let card of cards" [value]="card._id">{{ card.number }}</mat-option>
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
  styles: [],
})
export class TransferComponent {
  public cards: Card[] = MOCK_CARDS;
  public contacts: Contact[] = MOCK_CONTACTS;
  public transferForm = this.fb.group({
    name: ['', Validators.required],
    surname: ['', Validators.required],
    iban: ['', Validators.required],
    amount: ['', Validators.required],
    card: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private dialogService: DialogService,
    private snackBarService: SnackBarService
  ) { }

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
        console.log(this.transferForm.value);
        this.snackBarService.openDefaultSnackBar('Operazione avvenuta con successo!');
        this.transferForm.reset();
      }
    })
  }

  public openContact(): void {
    const dialogRef: MatDialogRef<ContactsComponent> = this.dialogService.openCustomDialog(ContactsComponent, this.contacts);

    dialogRef.componentInstance.deleteContact.subscribe((contactId: string) => {
      this.contacts = this.contacts.filter(card => card._id !== contactId);
      this.refreshContacts(dialogRef);
    });

    dialogRef.componentInstance.editContact.subscribe((contact: Contact) => {
      this.contacts = this.contacts.map(c => c._id === contact._id ? contact : c);
      this.refreshContacts(dialogRef);
    });

    dialogRef.componentInstance.addContact.subscribe((contact: Omit<Contact, '_id'>) => {
      const _id = `_${Math.random().toString(36).substr(2, 9)}`;
      const newContact: Contact = {...contact, _id };
      this.contacts = [...this.contacts, newContact];
      this.refreshContacts(dialogRef);
    });

    dialogRef.afterClosed().subscribe((selectedContactId: string) => {
      if (selectedContactId) {
        const selectedContact = this.contacts.find(c => c._id === selectedContactId);
        if (selectedContact) {
          this.transferForm.patchValue({
            name: selectedContact.name,
            surname: selectedContact.surname,
            iban: selectedContact.iban,
          });

        }
      }
    });
  }

  private refreshContacts(dialogRef: MatDialogRef<ContactsComponent>): void {
    dialogRef.componentInstance.contacts = this.contacts;
  }
}
