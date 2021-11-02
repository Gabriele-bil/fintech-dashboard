import { Component, OnInit } from '@angular/core';
import { Card } from '../models/card.model';
import { MOCK_CARDS } from '../shared/mock-data/mock-cards';
import { Movement } from '../models/movement.model';
import { MOCK_MOVEMENTS } from '../shared/mock-data/mock-movments';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'ft-movements',
  template: `
    <mat-card>
      <mat-form-field appearance="fill">
        <mat-label>Seleziona una carta</mat-label>
        <mat-select [formControl]="cardInput" (ngModelChange)="selectCard()">
          <mat-option *ngFor="let card of cards" [value]="card._id">
            {{ card.number }}
          </mat-option>
        </mat-select>
      </mat-form-field>

      <h2>Saldo: {{ balance | currency: 'EUR' }}</h2>

      <ng-container *ngIf="allMovementsOfSelectedCard.length; else noMovement">
        <ft-movement
          *ngFor="let movement of currentMovementsOfSelectedCard"
          [movementTimeStamp]="movement.timestamp"
          [movementType]="movement.type"
          [movementAmount]="movement.amount"
          [movementTitle]="movement.title"
          [movementDescription]="movement.description"
        >
        </ft-movement>
      </ng-container>

      <button
        *ngIf="allMovementsOfSelectedCard.length > (5 * page)" mat-button class="w-100"
              (click)="loadMovements()"
      >
        Carica altro
      </button>

      <ng-template #noMovement>
        <p>Non sono presenti movimenti per questa carta</p>
      </ng-template>
    </mat-card>
  `,
  styles: []
})
export class MovementsComponent implements OnInit {
  public cards: Card[] = MOCK_CARDS;
  public movements: Movement[] = MOCK_MOVEMENTS;
  public allMovementsOfSelectedCard: Movement[] = [];
  public currentMovementsOfSelectedCard: Movement[] = [];
  public balance = 0;
  public page = 1;
  public cardInput = new FormControl(this.cards[0]._id);
  public showAll = false;

  ngOnInit(): void {
    this.selectCard();
  }

  public selectCard(): void {
    this.showAll = false;
    this.allMovementsOfSelectedCard = this.movements.filter(m => m.cardId === this.cardInput.value);
    this.currentMovementsOfSelectedCard = this.allMovementsOfSelectedCard.slice(0,5);
    this.setBalance();
  }

  private setBalance(): void {
    const card = this.cards.find(c => c._id === this.cardInput.value);
    if (card) {
      this.balance = card.amount;
    }
  }

  public loadMovements(): void {
    this.page++;
    this.currentMovementsOfSelectedCard = this.allMovementsOfSelectedCard.slice(0, (5 * this.page));
  }
}
