import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppointmentsRoutingModule } from './appointments-routing.module';
import { AppointmentsComponent } from './appointments.component';
import { AppointmentsListComponent } from './components/appointments-list.component';
import { AppointmentsSelectDateComponent } from './components/appointments-select-date.component';
import { SharedModule } from '../../shared/modules/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from "@ngrx/store";
import { appointmentsFeatureKey, appointmentsReducer } from "./store/appointments.reducer";
import { EffectsModule } from "@ngrx/effects";
import { AppointmentsEffects } from "./store/appointments.effects";
import { AppointmentsFacade } from "./store/appointments.facade";

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
    ReactiveFormsModule,
    StoreModule.forFeature(appointmentsFeatureKey, appointmentsReducer),
    EffectsModule.forFeature([AppointmentsEffects])
  ],
  providers: [AppointmentsFacade]
})
export class AppointmentsModule { }
