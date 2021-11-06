import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/modules/material.module';
import { SignInComponent } from './views/sign-in.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './views/register.component';
import { LoginComponent } from './views/login.component';
import { CardListComponent } from './views/card-list.component';
import { CardFormComponent } from './views/card-form.component';
import { CardsComponent } from './views/cards.component';
import { MovementComponent } from './views/movement.component';
import { MovementsComponent } from './views/movements.component';
import { TruncatePipe } from './shared/pipes/truncate.pipe';
import { MovementInOutDirective } from './shared/directives/movement-in-out.directive';
import { TransferComponent } from './views/transfer.component';
import { DialogComponent } from './shared/components/dialog.component';
import { ContactsComponent } from './views/contacts.component';
import { FilterPipe } from './shared/pipes/filter.pipe';
import { ContactFormComponent } from './views/contact-form.component';
import { ContactListComponent } from './views/contact-list.component';
import { AppointmentsComponent } from './views/appointments.component';
import { AppointmentsListComponent } from './views/appointments-list.component';
import { AppointmentsSelectDateComponent } from './views/appointments-select-date.component';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    RegisterComponent,
    LoginComponent,
    CardListComponent,
    CardFormComponent,
    CardsComponent,
    MovementComponent,
    MovementsComponent,
    TruncatePipe,
    MovementInOutDirective,
    TransferComponent,
    DialogComponent,
    ContactsComponent,
    FilterPipe,
    ContactFormComponent,
    ContactListComponent,
    AppointmentsComponent,
    AppointmentsListComponent,
    AppointmentsSelectDateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
