import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CardForm } from '../../models/card-form.model';
import { Subject } from 'rxjs';
import { MatDrawer } from '@angular/material/sidenav';
import { takeUntil } from "rxjs/operators";
import { CardsFacade } from "./store/cards.facade";

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
export class CardsComponent implements OnInit, OnDestroy {
  @ViewChild('drawer') drawer!: MatDrawer;
  private destroy$ = new Subject<void>();
  public cards$ = this.cardsFacade.cards$.pipe(takeUntil(this.destroy$));

  constructor(private cardsFacade: CardsFacade) { }

  public ngOnInit(): void {
    this.cardsFacade.setCards();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
  }

  public removeCard(cardId: string): void {
    this.cardsFacade.removeCard(cardId);
  }

  public saveCard(newCard: CardForm): void {
    this.cardsFacade.addCard(newCard);
  }

  public goToCardMovements(cardId: string): void {
    this.cardsFacade.navigateToCardMovements(cardId);
  }
}
