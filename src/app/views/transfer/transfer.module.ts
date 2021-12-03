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
import { StoreModule } from "@ngrx/store";
import { contactsFeatureKey, contactsReducer } from "./store/contact/contacts.reducer";
import { EffectsModule } from "@ngrx/effects";
import { ContactsEffects } from "./store/contact/contacts.effects";
import { ContactsFacade } from "./store/contact/contacts.facade";


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
    ReactiveFormsModule,
    StoreModule.forFeature(contactsFeatureKey, contactsReducer),
    EffectsModule.forFeature([ContactsEffects])
  ],
  providers: [ContactsFacade]
})
export class TransferModule {
}
