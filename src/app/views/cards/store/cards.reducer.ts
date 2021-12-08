import { Card } from "src/app/models/card.model";
import { createReducer, on } from "@ngrx/store";
import { addCardSuccess, setCardsSuccess, removeCardSuccess } from "./cards.actions";
import { createEntityAdapter, EntityState } from "@ngrx/entity";

export const cardsFeatureKey = 'cards';

export interface CardsState extends EntityState<Card>{ }

export const cardsAdapter = createEntityAdapter<Card>({
  selectId: (card) => card._id
})

export const initialState: CardsState = cardsAdapter.getInitialState();

export const cardsReducer = createReducer(
  initialState,
  on(setCardsSuccess, (state, { cards }) => cardsAdapter.setAll(cards, state)),
  on(removeCardSuccess, (state, { cardId }) => cardsAdapter.removeOne(cardId, state)),
  on(addCardSuccess, (state, { card }) => cardsAdapter.addOne(card, state))
);
