import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardsRoutingModule } from './cards-routing.module';
import { CardListComponent } from './components/card-list.component';
import { CardFormComponent } from './components/card-form.component';
import { CardsComponent } from './cards.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/modules/shared.module';
import { StoreModule } from "@ngrx/store";
import { cardsFeatureKey, cardsReducer } from "./store/cards.reducer";
import { EffectsModule } from "@ngrx/effects";
import { CardsEffects } from "./store/cards.effects";
import { CardsFacade } from "./store/cards.facade";

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
    ReactiveFormsModule,
    StoreModule.forFeature(cardsFeatureKey, cardsReducer),
    EffectsModule.forFeature([CardsEffects])
  ],
  providers: [CardsFacade]
})
export class CardsModule { }
