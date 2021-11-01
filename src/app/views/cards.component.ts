import { Component } from '@angular/core';
import { Card } from '../models/card.model';
import { CardForm } from '../models/card-form.model';

@Component({
  selector: 'ft-cards',
  template: `
    <div id="container">
      <mat-drawer-container class="h-100 w-100" autosize>
        <ft-card-list
          [cards]="cards"
          (addCard)="drawer.toggle()"
          (showCardMovements)="goToCardMovements($event)"
          (removeCard)="removeCard($event)"
        ></ft-card-list>

        <mat-drawer #drawer mode="side" position="end">
          <ft-card-form
            (cancelForm)="drawer.toggle()"
            (saveCard)="saveCard($event)"
          ></ft-card-form>
        </mat-drawer>

      </mat-drawer-container>
    </div>
  `,
  styles: [`
    #container {
      height: 600px;
    }
  `],
})
export class CardsComponent {
  public cards: Card[] = [
    {
      _id: '076be7cd-a4a4-4b88-a067-bf2b8573e237',
      number: '0000 0000 0000 0000',
      ownerId: 'et45er5e6fba',
      owner: 'Mario Rossi',
      type: 'visa',
      amount: 15000,
    },
    {
      _id: '16b378d3-dd04-4c72-afba-e1546790a3b3',
      number: '1111 1111 1111 1111',
      ownerId: 'et45er5e6fba',
      owner: 'Mario Rossi',
      type: 'mastercard',
      amount: 500,
    },
    {
      _id: '8c1fe830-7f56-4f57-a15c-074fd2ad969f',
      number: '2222 2222 2222 2222',
      ownerId: 'et45er5e6fba',
      owner: 'Mario Rossi',
      type: 'visa',
      amount: 250000,
    },
  ];

  public removeCard(cardId: string): void {
    this.cards = this.cards.filter(card => card._id !== cardId);
  }

  public saveCard(newCard: CardForm): void {
    const card: Card = {
      _id: Date.now().toString(36) + Math.random().toString(36).substr(2),
      number: newCard.cardNumber,
      owner: `${newCard.name} ${newCard.surname}`,
      ownerId: '1',
      amount: 0,
      type: newCard.cardType
    };

    this.cards = [...this.cards, card];
  }

  public goToCardMovements(cardId: string): void {
    // TODO andare alla lista dei movimenti
    console.log(cardId);
  }
}
