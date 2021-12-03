import { Contact } from "src/app/models/contact.model";
import { createReducer, on } from "@ngrx/store";
import { addContactSuccess, deleteContactSuccess, setContactsSuccess, updateContactSuccess } from "./contacts.actions";

export const contactsFeatureKey = 'contacts';

export interface ContactsState {
  contacts: Contact[];
}

export const initialState: ContactsState = {
  contacts: [],
}

export const contactsReducer = createReducer(
  initialState,
  on(setContactsSuccess, (state, { contacts }) => ({ ...state, contacts })),
  on(updateContactSuccess, (state, { contact }) => ({
    ...state,
    contacts: state.contacts.map(c => c._id === contact._id ? contact : c)
  })),
  on(deleteContactSuccess, (state, { contactId }) => ({
    ...state,
    contacts: state.contacts.filter(c => c._id !== contactId)
  })),
  on(addContactSuccess, (state, { contact }) => ({
    ...state,
    contacts: [...state.contacts, contact]
  }))
);
