import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Contact } from '../../../models/contact.model';
import { Observable } from "rxjs";

@Component({
  selector: 'ft-contacts',
  template: `
    <div id="container" *ngIf="contacts$ | async as contacts">
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
  @Input() contacts$: Observable<Contact[]> | null = null;
  @Input() showList = true;

  @Output() deleteContact = new EventEmitter<string>();
  @Output() addContact = new EventEmitter<Omit<Contact, '_id'>>();
  @Output() editContact = new EventEmitter<Contact>();

  public selectedContact: Contact | null = null;

  constructor(public dialogRef: MatDialogRef<ContactsComponent>) {
  }

  public toggleShowList(): void {
    this.showList = !this.showList;
  }

  public saveContactHandler(contact: Omit<Contact, '_id'>): void {
    this.selectedContact
      ? this.editContact.emit({ ...contact, _id: this.selectedContact._id })
      : this.addContact.emit(contact);
  }

  public selectContactHandler(contactId: string): void {
    this.dialogRef.close(contactId);
  }
}
