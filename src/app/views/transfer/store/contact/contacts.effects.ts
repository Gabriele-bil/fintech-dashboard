import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ContactsService } from "../../../../api/contacts.service";
import * as contactActions from './contacts.actions';
import { addContactSuccess, deleteContactSuccess } from './contacts.actions';
import { map, switchMap } from "rxjs/operators";

@Injectable()
export class ContactsEffects {
  public setContacts$ = createEffect(() => this.action$.pipe(
    ofType(contactActions.setContacts),
    switchMap(() => this.contactsService.getAll().pipe(
      map(contacts => contactActions.setContactsSuccess({ contacts }))
    ))
  ));

  public updateContact$ = createEffect(() => this.action$.pipe(
    ofType(contactActions.updateContact),
    switchMap(({ contact }) => this.contactsService.updateContact(contact).pipe(
      map(contact => contactActions.updateContactSuccess({ contact }))
    ))
  ));

  public deleteContact$ = createEffect(() => this.action$.pipe(
    ofType(contactActions.deleteContact),
    switchMap(({ contactId }) => this.contactsService.deleteContact(contactId).pipe(
      map(() => deleteContactSuccess({ contactId }))
    ))
  ))

  public addContact$ = createEffect(() => this.action$.pipe(
    ofType(contactActions.addContact),
    switchMap(({ contact }) => this.contactsService.addContact(contact).pipe(
      map(contact => addContactSuccess({ contact }))
    ))
  ))

  constructor(
    private action$: Actions,
    private contactsService: ContactsService
  ) {
  }
}
