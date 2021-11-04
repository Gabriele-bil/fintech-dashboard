import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from '../../models/contact.model';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(contacts: Contact[], searchText: string): Contact[] {
    return contacts.filter(contact => contact.name.includes(searchText) || contact.surname.includes(searchText));
  }
}
