import { Component } from '@angular/core';
import { Card } from '../models/card.model';
import { CardForm } from '../models/card-form.model';
import { SnackBarService } from '../shared/services/snack-bar.service';
import { MOCK_CARDS } from '../shared/mock-data/mock-cards';

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
  public cards: Card[] = MOCK_CARDS;

  constructor(private snackBarService: SnackBarService) { }

  public removeCard(cardId: string): void {
    this.cards = this.cards.filter(card => card._id !== cardId);
    this.snackBarService.openDefaultSnackBar('La carta è stata rimossa correttamente');
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
    this.snackBarService.openDefaultSnackBar('La carta è stata aggiunta correttamente');
  }

  public goToCardMovements(cardId: string): void {
    // TODO andare alla lista dei movimenti
    console.log(cardId);
  }
}
