import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MOCK_CARDS } from '../../shared/mock-data/mock-cards';
import { Card } from '../../models/card.model';
import { DialogService } from '../../shared/services/dialog.service';
import { SnackBarService } from '../../shared/services/snack-bar.service';
import { ContactsComponent } from './components/contacts.component';
import { MOCK_CONTACTS } from '../../shared/mock-data/mock-contacts';
import { Contact } from '../../models/contact.model';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { CardsService } from '../../api/cards.service';
import { ContactsService } from '../../api/contacts.service';
import { TransferService } from '../../api/transfer.service';

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
  styles: [],
})
export class TransferComponent implements OnInit {
  public cards$: Observable<Card[]> | null = null;

  public contacts: Contact[] = [];
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
    private snackBarService: SnackBarService,
    private cardService: CardsService,
    private contactService: ContactsService,
    private transferService: TransferService
  ) { }

  ngOnInit(): void {
    this.cards$ = this.cardService.getAll();
    this.getContacts();
    this
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
    const dialogRef: MatDialogRef<ContactsComponent> = this.dialogService.openCustomDialog(ContactsComponent, this.contacts);
    /*dialogRef.componentInstance.contacts = this.contacts;*/

    setTimeout(() => {

    }, 2000);

    dialogRef.componentInstance.deleteContact.subscribe((contactId: string) =>
      this.contactService.deleteContact(contactId).subscribe(() => this.getContacts(dialogRef))
    );

    dialogRef.componentInstance.editContact.subscribe((contact: Contact) =>
      this.contactService.updateContact(contact).subscribe(() => {
        console.log('1');
        this.getContacts(dialogRef);
        dialogRef.componentInstance.toggleShowList();
      })
    );

    dialogRef.componentInstance.addContact.subscribe((contact: Omit<Contact, '_id'>) =>
      this.contactService.addContact(contact).subscribe(() => {
        this.getContacts(dialogRef);
        dialogRef.componentInstance.toggleShowList();
      })
    );

    dialogRef.afterClosed().subscribe((selectedContactId: string) => {
      if (selectedContactId) {
        const selectedContact = this.contacts.find(c => c._id === selectedContactId);
        if (selectedContact) {
          this.transferForm.patchValue(selectedContact);
        }
      }
    });
  }

  private getContacts(dialogRef?: MatDialogRef<ContactsComponent>): void {
    this.contactService.getAll().subscribe(contacts => {
      this.contacts = contacts;
      if (dialogRef) {
        /*dialogRef.componentInstance.prova = 'prova modificata'*/
        dialogRef.componentInstance.contacts = this.contacts;
        dialogRef.componentInstance.refreshTemplate();
      }
    });
  }
}
