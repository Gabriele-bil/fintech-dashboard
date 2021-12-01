import { createFeatureSelector, createSelector } from "@ngrx/store";
import { contactsFeatureKey, ContactsState } from "./contacts.reducer";
import { Contact } from "src/app/models/contact.model";

export const getContactsFeature = createFeatureSelector<ContactsState>(contactsFeatureKey);

export const getContacts$ = createSelector(
  getContactsFeature,
  state => state.contacts
);

export const getContact$ = createSelector(
  getContacts$,
  (contacts: Contact[], contactId: string) => contacts.find(c => c._id === contactId)
);
