import { createAction, props } from "@ngrx/store";
import { Card } from "src/app/models/card.model";
import { CardForm } from "src/app/models/card-form.model";

export const setCards = createAction('[Cards] Set Cards');
export const setCardsSuccess = createAction('[Cards] Set Cards Success', props<{ cards: Card[] }>());

export const removeCard = createAction('[Cards] Remove Card', props<{ cardId: string }>());
export const removeCardSuccess = createAction('[Cards] Remove Card Success', props<{ cardId: string }>());

export const addCard = createAction('[Cards] add Card', props<{ newCard: CardForm }>());
export const addCardSuccess = createAction('[Cards] Add Card Success', props<{ card: Card }>());

export const navigateToCardMovements = createAction('[Cards] Navigate to card movements', props<{ cardId: string }>());
