import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardsRoutingModule } from './cards-routing.module';
import { CardListComponent } from './components/card-list.component';
import { CardFormComponent } from './components/card-form.component';
import { CardsComponent } from './cards.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/modules/shared.module';

@NgModule({
  declarations: [
    CardListComponent,
    CardFormComponent,
    CardsComponent,
  ],
  imports: [
    CommonModule,
    CardsRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class CardsModule { }
