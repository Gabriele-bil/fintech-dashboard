import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Card } from '../../../models/card.model';

@Component({
  selector: 'ft-card-list',
  template: `
    <mat-list>
      <div mat-subheader>Carte</div>
      <mat-list-item *ngFor="let card of cards">
        <mat-icon matListIcon>payment</mat-icon>

        <div matLine class="d-flex flex-column me-5">
          {{ card.number }}
          <p class="mb-0"><strong>{{ card.amount | currency: 'EUR' }}</strong> - {{ card.type | titlecase }}</p>
        </div>

        <mat-icon matTooltip="Vedi movimenti" (click)="showCardMovements.emit(card._id)">receipt_long</mat-icon>
        <mat-icon matTooltip="Rimuovi" (click)="removeCard.emit(card._id)">delete</mat-icon>
      </mat-list-item>
    </mat-list>
    <div class="px-3">
      <button mat-raised-button class="w-100 mt-3" (click)="addCard.emit()">Aggiungi</button>
    </div>
  `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardListComponent {
  @Input() cards: Card[] = [];
  @Output() showCardMovements = new EventEmitter<string>();
  @Output() removeCard = new EventEmitter<string>();
  @Output() addCard = new EventEmitter<void>();
}
