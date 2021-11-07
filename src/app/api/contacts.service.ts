import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact } from '../models/contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  constructor(private http: HttpClient) { }

  public getAll(): Observable<Contact[]> {
    return this.http.get<Contact[]>(`/contacts`);
  }

  public addContact(contact: Omit<Contact, '_id'>): Observable<Contact> {
    return this.http.post<Contact>(`/contacts`, { contact });
  }

  public updateContact(contact: Partial<Contact>): Observable<Contact> {
    return this.http.put<Contact>(`/contacts/${contact._id}`, { contact });
  }

  public deleteContact(contactId: string): Observable<boolean> {
    return this.http.delete<boolean>(`/contacts/${contactId}`);
  }
}
