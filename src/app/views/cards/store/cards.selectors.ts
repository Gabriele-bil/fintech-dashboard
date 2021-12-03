import { createFeatureSelector, createSelector } from "@ngrx/store";
import { cardsFeatureKey, CardsState } from "./cards.reducer";

export const getCardsFeature = createFeatureSelector<CardsState>(cardsFeatureKey);

export const getCards$ = createSelector(
  getCardsFeature,
  state => state.cards
);
