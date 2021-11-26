import { Component, OnDestroy, OnInit } from '@angular/core';
import { Card } from '../../models/card.model';
import { PaginatedMovements } from '../../models/movement.model';
import { CardsService } from '../../api/cards.service';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { filter, map, scan, switchMap, takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

type PaginetedMovementsWithCardId = PaginatedMovements & { selectedCardId: string | null };

@Component({
  selector: 'ft-movements',
  template: `
    <mat-card>
      <mat-form-field appearance="fill">
        <mat-label>Seleziona una carta</mat-label>
        <mat-select [value]="selectedCardId$ | async" (valueChange)="onCardChange($event)">
          <mat-option *ngFor="let card of cards$ | async" [value]="card._id">
            {{ card.number }}
          </mat-option>
        </mat-select>
      </mat-form-field>

      <h2>Saldo: {{ balance$ | async | currency: 'EUR' }}</h2>

      <ng-container *ngIf="movements$ | async as movements">
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
            *ngIf="shouldLoadMore$ | async" mat-button class="w-100"
            (click)="page$.next(this.page$.value + 1)"
          >
            Carica altro
          </button>
        </ng-container>

        <ng-template #noMovement>
          <p>Non sono ancora presenti movimenti per questa carta</p>
        </ng-template>
      </ng-container>
    </mat-card>
  `,
  styles: [],
})
export class MovementsComponent implements OnInit, OnDestroy {
  public cards$ = new BehaviorSubject<Card[]>([]);
  public selectedCardId$ = this.activatedRoute.params.pipe(
    map(({ cardId }) => cardId)
  );
  public selectedCard$ = combineLatest([this.cards$, this.selectedCardId$]).pipe(
    map(([cards, selectedCardId]) => cards.find(c => c._id === selectedCardId))
  );
  public page$ = new BehaviorSubject<number>(0);
  public movements$: Observable<PaginatedMovements> = combineLatest([this.selectedCardId$, this.page$]).pipe(
    filter(([selectedCardId, page]) => !!selectedCardId),
    switchMap(([selectedCardId, page]) => this.cardsService.getCardMovements(selectedCardId, 5, page * 5).pipe(
      map(paginatedMovements => ({ ...paginatedMovements, selectedCardId }))
    )),
    scan((acc, curr) => {
      if (acc.selectedCardId !== curr.selectedCardId) {
        return curr;
      }
      return { data: [...acc.data, ...curr.data], total: curr.total, selectedCardId: curr.selectedCardId }
    }, { data: [], total: 0, selectedCardId: null } as PaginetedMovementsWithCardId),
    map(({ data, total }) => ({ data, total }))
  );
  public balance$ = this.selectedCard$.pipe(
    map(selectedCard => selectedCard?.amount || 0)
  );
  public shouldLoadMore$ = this.movements$.pipe(
    map(paginatedMovements => paginatedMovements.data.length < paginatedMovements.total)
  );
  private destroy$ = new Subject<void>();

  constructor(
    private cardsService: CardsService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  public ngOnInit(): void {
    this.cardsService.getAll().pipe(takeUntil(this.destroy$))
      .subscribe(cards => this.cards$.next(cards));
  }

  public onCardChange(cardId: string): void {
    this.page$.next(0);
    this.router.navigateByUrl(`dashboard/movements/${cardId}`);
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
  }
}
