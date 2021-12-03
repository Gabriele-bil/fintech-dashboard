import { createAction, props } from "@ngrx/store";
import { Contact } from "src/app/models/contact.model";

export const setContacts = createAction('[Contact] set contact');
export const setContactsSuccess = createAction('[Contact] set contact success', props<{ contacts: Contact[] }>());

export const updateContact = createAction('[Contact] edit contact', props<{ contact: Partial<Contact> }>());
export const updateContactSuccess = createAction('[Contact] edit contact success', props<{ contact: Contact }>());

export const addContact = createAction('[Contact] add contact', props<{ contact: Omit<Contact, '_id'> }>());
export const addContactSuccess = createAction('[Contact] add contact success', props<{ contact: Contact }>());

export const deleteContact = createAction('[Contact] delete contact', props<{ contactId: string }>());
export const deleteContactSuccess = createAction('[Contact] delete contact success', props<{ contactId: string }>());
