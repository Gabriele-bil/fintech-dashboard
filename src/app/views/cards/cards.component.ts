import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Card } from '../../models/card.model';
import { CardForm } from '../../models/card-form.model';
import { SnackBarService } from '../../shared/services/snack-bar.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { CardsService } from '../../api/cards.service';
import { MatDrawer } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { takeUntil } from "rxjs/operators";

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
  public cards$ = new BehaviorSubject<Card[]>([]);
  private destroy$ = new Subject<void>();

  constructor(
    private snackBarService: SnackBarService,
    private cardsService: CardsService,
    private router: Router
  ) { }

  public ngOnInit(): void {
    this.getCards();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
  }

  public removeCard(cardId: string): void {
    this.cardsService.deleteCard(cardId).subscribe(() => {
      this.getCards();
      this.snackBarService.openDefaultSnackBar('La carta è stata rimossa correttamente');
    });
  }

  public saveCard(newCard: CardForm): void {
    this.cardsService.addCard(newCard).subscribe(() => {
      this.getCards()
      this.snackBarService.openDefaultSnackBar('La carta è stata aggiunta correttamente');
      this.drawer.close();
    });
  }

  public goToCardMovements(cardId: string): void {
    this.router.navigateByUrl(`dashboard/movements/${cardId}`)
  }

  private getCards(): void {
    this.cardsService.getAll()
      .pipe(takeUntil(this.destroy$))
      .subscribe(cards => this.cards$.next(cards));
  }
}
