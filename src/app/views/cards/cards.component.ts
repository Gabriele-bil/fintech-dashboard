import { Component, OnInit, ViewChild } from '@angular/core';
import { Card } from '../../models/card.model';
import { CardForm } from '../../models/card-form.model';
import { SnackBarService } from '../../shared/services/snack-bar.service';
import { Observable } from 'rxjs';
import { CardsService } from '../../api/cards.service';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'ft-cards',
  template: `
    <div id="container">
      <mat-drawer-container class="h-100 w-100" autosize>
        <ft-card-list
          [cards]="(cards$ | async) || []"
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
export class CardsComponent implements OnInit {
  @ViewChild('drawer') drawer!: MatDrawer;
  public cards: Card[] = [];
  public cards$: Observable<Card[]> | null = null;

  constructor(private snackBarService: SnackBarService, private cardsService: CardsService) { }

  ngOnInit(): void {
    this.getCards();
  }

  public removeCard(cardId: string): void {
    this.cards = this.cards.filter(card => card._id !== cardId);
    this.snackBarService.openDefaultSnackBar('La carta è stata rimossa correttamente');
  }

  public saveCard(newCard: CardForm): void {
    this.cardsService.addCard(newCard).subscribe(() => {
      this.getCards()
      this.snackBarService.openDefaultSnackBar('La carta è stata aggiunta correttamente');
      this.drawer.close();
    });
  }

  public goToCardMovements(cardId: string): void {
    // TODO andare alla lista dei movimenti
    console.log(cardId);
  }

  private getCards(): void {
    this.cards$ = this.cardsService.getAll();
  }
}
