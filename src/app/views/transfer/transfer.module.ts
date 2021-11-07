import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransferRoutingModule } from './transfer-routing.module';
import { TransferComponent } from './transfer.component';
import { ContactFormComponent } from './components/contact-form.component';
import { ContactListComponent } from './components/contact-list.component';
import { FilterPipe } from './pipes/filter.pipe';
import { ContactsComponent } from './components/contacts.component';
import { SharedModule } from '../../shared/modules/shared.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    TransferComponent,
    ContactFormComponent,
    ContactListComponent,
    ContactsComponent,
    FilterPipe,
  ],
  imports: [
    CommonModule,
    TransferRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class TransferModule { }
