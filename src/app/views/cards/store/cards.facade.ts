import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { getCards$ } from "./cards.selectors";
import { addCard, navigateToCardMovements, removeCard, setCards } from "./cards.actions";
import { CardForm } from "src/app/models/card-form.model";

@Injectable()
export class CardsFacade {
  public cards$ = this.store.select(getCards$);

  constructor(private store: Store) { }

  public setCards(): void {
    this.store.dispatch(setCards());
  }

  public addCard(newCard: CardForm): void {
    this.store.dispatch(addCard({ newCard }));
  }

  public removeCard(cardId: string): void {
    this.store.dispatch(removeCard({ cardId }));
  }

  public navigateToCardMovements(cardId: string): void {
    this.store.dispatch(navigateToCardMovements({ cardId }));
  }
}
