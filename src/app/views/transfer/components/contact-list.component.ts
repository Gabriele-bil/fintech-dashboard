import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Contact } from '../../../models/contact.model';

@Component({
  selector: 'ft-contact-list',
  template: `
    <mat-form-field appearance="outline" class="w-100">
      <mat-label>Cerca</mat-label>
      <input matInput #searchElement>
      <button mat-icon-button *ngIf="searchElement.value" matSuffix (click)="searchElement.value=''">
        <mat-icon>close</mat-icon>
      </button>
    </mat-form-field>

    <mat-list class="w-100">
      <div mat-subheader>Contatti</div>
      <ng-container *ngIf="contacts.length; else noContacts">
        <div *ngFor="let contact of contacts | filter: searchElement.value">
          <mat-grid-list cols="9">
            <mat-grid-tile [colspan]="1">
              <mat-icon>person</mat-icon>
            </mat-grid-tile>
            <mat-grid-tile [colspan]="5">
              <div>
                <p class="mb-0">{{ contact.name }} {{ contact.surname }}</p>
                <p class="mb-0">{{ contact.iban }}</p>
              </div>
            </mat-grid-tile>
            <mat-grid-tile [colspan]="1">
              <button mat-icon-button (click)="selectContact.emit(contact._id)">
                <mat-icon>done</mat-icon>
              </button>
            </mat-grid-tile>
            <mat-grid-tile [colspan]="1">
              <button mat-icon-button (click)="editContact.emit(contact)">
                <mat-icon>edit</mat-icon>
              </button>
            </mat-grid-tile>
            <mat-grid-tile [colspan]="1">
              <button mat-icon-button (click)="deleteContact.emit(contact._id)">
                <mat-icon>delete</mat-icon>
              </button>
            </mat-grid-tile>
          </mat-grid-list>
        </div>
      </ng-container>
      <ng-template #noContacts>
        <p>Non sono presenti contatti</p>
      </ng-template>
    </mat-list>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactListComponent {
  @Input() contacts: Contact[] = [];
  @Output() selectContact = new EventEmitter<string>();
  @Output() editContact = new EventEmitter<Contact>();
  @Output() deleteContact = new EventEmitter<string>();
}
