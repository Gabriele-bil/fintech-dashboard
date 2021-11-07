import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { NavModule } from '../../core/nav/nav.module';
import { MaterialModule } from '../../shared/modules/material.module';
import { WelcomeComponent } from './components/welcome.component';


@NgModule({
  declarations: [
    DashboardComponent,
    WelcomeComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NavModule,
    MaterialModule
  ]
})
export class DashboardModule { }
