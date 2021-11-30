import { Card } from "src/app/models/card.model";
import { createReducer, on } from "@ngrx/store";
import { addCardSuccess, setCardsSuccess, removeCardSuccess } from "./cards.actions";

export const cardsFeatureKey = 'cards';

export interface CardsState {
  cards: Card[];
}

export const initialState: CardsState = {
  cards: []
}

export const cardsReducer = createReducer(
  initialState,
  on(setCardsSuccess, (state, action) => ({ ...state, cards: action.cards })),
  on(removeCardSuccess, (state, action) => ({
    ...state,
    cards: state.cards.filter(c => c._id !== action.cardId)
  })),
  on(addCardSuccess, (state, action) => ({
    ...state,
    cards: [...state.cards, action.card]
  }))
);
