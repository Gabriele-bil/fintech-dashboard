import { Component, OnInit } from '@angular/core';
import { Card } from '../../models/card.model';
import { PaginatedMovements } from '../../models/movement.model';
import { FormControl } from '@angular/forms';
import { CardsService } from '../../api/cards.service';

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

      <ng-container *ngIf="movements && movements.data.length; else noMovement">
        <ft-movement
          *ngFor="let movement of movements.data"
          [movementTimeStamp]="movement.timestamp"
          [movementType]="movement.type"
          [movementAmount]="movement.amount"
          [movementTitle]="movement.title"
          [movementDescription]="movement.description"
        >
        </ft-movement>

        <button
          *ngIf="movements.data.length < movements.total" mat-button class="w-100"
          (click)="loadMovements()"
        >
          Carica altro
        </button>
      </ng-container>

      <ng-template #noMovement>
        <p>Non sono ancora presenti movimenti per questa carta</p>
      </ng-template>
    </mat-card>
  `,
  styles: [],
})
export class MovementsComponent implements OnInit {
  public cards: Card[] = [];
  public movements: PaginatedMovements | null = null;
  public balance = 0;
  public cardInput = new FormControl('');
  private page = 0;

  constructor(private cardsService: CardsService) { }

  ngOnInit(): void {
    this.cardsService.getAll().subscribe(cards => this.cards = cards);
  }

  public selectCard(): void {
    this.page = 0;
    this.movements = null;
    this.getMovements();
    this.setBalance();
  }

  public loadMovements(): void {
    this.page++;
    this.getMovements();
  }

  private setBalance(): void {
    const card = this.cards.find(c => c._id === this.cardInput.value);
    if (card) {
      this.balance = card.amount;
    }
  }

  private getMovements(): void {
    this.cardsService.getCardMovements(this.cardInput.value, 5, this.page * 5).subscribe(movements => {
      this.movements?.data
      ? this.movements = { ...this.movements, data: [...this.movements?.data, ...movements.data] }
      : this.movements = movements;
    });
  }
}
