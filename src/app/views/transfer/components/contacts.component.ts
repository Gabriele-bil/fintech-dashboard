import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  EventEmitter,
  Inject, Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Contact } from '../../../models/contact.model';

@Component({
  selector: 'ft-contacts',
  template: `
    <div id="container">
      <ng-container *ngIf="showList; else contactForm">
        <ft-contact-list
          [contacts]="contacts"
          (selectContact)="selectContactHandler($event)"
          (editContact)="selectedContact = $event; toggleShowList()"
          (deleteContact)="deleteContact.emit($event)"
        ></ft-contact-list>
        <button
          mat-raised-button color="primary"
          class="w-100 mt-3"
          (click)="toggleShowList(); selectedContact = null">
          Nuovo contatto
        </button>
      </ng-container>

      <ng-template #contactForm>
        <button mat-stroked-button class="w-100 mb-3" (click)="toggleShowList()">
          Indietro
        </button>
        <ft-contact-form
          [initialContact]="selectedContact"
          (saveContact)="saveContactHandler($event)"
        >
        </ft-contact-form>
      </ng-template>

      <pre>{{ prova }}</pre>
    </div>
  `,
  styles: [`
    #container {
      width: 500px;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactsComponent {
  /*@Input() contacts: Contact[] = [];*/

  @Input() prova = 'prova'

  @Output() deleteContact = new EventEmitter<string>();
  @Output() addContact = new EventEmitter<Omit<Contact, '_id'>>();
  @Output() editContact = new EventEmitter<Contact>();


  public showList = true;
  public selectedContact: Contact | null = null;

  constructor(
    public dialogRef: MatDialogRef<ContactsComponent>,
    private changeDetection: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public contacts: Contact[],
  ) { }

  public toggleShowList(): void {
    this.showList = !this.showList;
  }

  public saveContactHandler(contact: Omit<Contact, '_id'>): void {
    console.log(contact);
    this.selectedContact
      ? this.editContact.emit({ ...contact, _id: this.selectedContact._id })
      : this.addContact.emit(contact);
  }

  public selectContactHandler(contactId: string): void {
    this.dialogRef.close(contactId);
  }

  public refreshTemplate(): void {
    this.changeDetection.detectChanges();
  }
}
