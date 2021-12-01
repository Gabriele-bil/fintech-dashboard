import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { getContacts$ } from "./contacts.selectors";
import { addContact, deleteContact, setContacts, updateContact } from "./contacts.actions";
import { Contact } from "src/app/models/contact.model";

@Injectable()
export class ContactsFacade {
  public contacts$ = this.store.select(getContacts$);

  constructor(private store: Store) { }

  public setContacts(): void {
    this.store.dispatch(setContacts());
  }

  public updateContact(contact: Partial<Contact>): void {
    this.store.dispatch(updateContact({ contact }));
  }

  public addContact(contact: Omit<Contact, '_id'>): void {
    this.store.dispatch(addContact({ contact }));
  }

  public deleteContact(contactId: string): void {
    this.store.dispatch(deleteContact({ contactId }));
  }
}
