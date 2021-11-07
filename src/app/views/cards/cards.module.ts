import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardsRoutingModule } from './cards-routing.module';
import { CardListComponent } from './components/card-list.component';
import { CardFormComponent } from './components/card-form.component';
import { CardsComponent } from './cards.component';
import { MaterialModule } from '../../shared/modules/material.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CardListComponent,
    CardFormComponent,
    CardsComponent,
  ],
  imports: [
    CommonModule,
    CardsRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class CardsModule { }
