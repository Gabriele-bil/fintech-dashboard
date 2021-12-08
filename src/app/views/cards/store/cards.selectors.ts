import { createFeatureSelector, createSelector } from "@ngrx/store";
import { cardsAdapter, cardsFeatureKey, CardsState } from "./cards.reducer";

export const getCardsFeature = createFeatureSelector<CardsState>(cardsFeatureKey);

export const getCards$ = createSelector(
  getCardsFeature,
  cardsAdapter.getSelectors().selectAll
);
