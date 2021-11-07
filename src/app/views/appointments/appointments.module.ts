import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppointmentsRoutingModule } from './appointments-routing.module';
import { AppointmentsComponent } from './appointments.component';
import { AppointmentsListComponent } from './components/appointments-list.component';
import { AppointmentsSelectDateComponent } from './components/appointments-select-date.component';
import { SharedModule } from '../../shared/modules/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppointmentsComponent,
    AppointmentsListComponent,
    AppointmentsSelectDateComponent
  ],
  imports: [
    CommonModule,
    AppointmentsRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class AppointmentsModule { }
