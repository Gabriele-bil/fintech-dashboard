import { Injectable } from "@angular/core";
import { CardsService } from "../../../api/cards.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as cardActions from "./cards.actions";
import { map, switchMap, tap } from "rxjs/operators";
import { Router } from "@angular/router";
import { SnackBarService } from "src/app/shared/services/snack-bar.service";
import { setSpinner } from "../../../core/store/core.actions";

@Injectable()
export class CardsEffects {
  public setCards$ = createEffect(() => this.actions$.pipe(
    ofType(cardActions.setCards),
    switchMap(() => this.cardsService.getAll().pipe(
      map(cards => cardActions.setCardsSuccess({ cards }))
    ))
  ));

  public setSpinner$ = createEffect(() => this.actions$.pipe(
    ofType(cardActions.setCards),
    map(() => setSpinner({ loading: true }))
  ));

  public disableSpinner$ = createEffect(() => this.actions$.pipe(
    ofType(cardActions.setCardsSuccess),
    map(() => setSpinner({ loading: false }))
  ));

  public removeCard$ = createEffect(() => this.actions$.pipe(
    ofType(cardActions.removeCard),
    switchMap(({ cardId }) => this.cardsService.deleteCard(cardId).pipe(
      tap(() => this.snackBarService.openDefaultSnackBar('La carta è stata rimossa correttamente')),
      map(() => cardActions.removeCardSuccess({ cardId }))
    ))
  ));

  public addCard$ = createEffect(() => this.actions$.pipe(
    ofType(cardActions.addCard),
    switchMap(({ newCard }) => this.cardsService.addCard(newCard).pipe(
      tap(() => this.snackBarService.openDefaultSnackBar(`La carta ${newCard.name} è stata aggiunta correttamente`)),
      map(card => cardActions.addCardSuccess({ card }))
    ))
  ));

  public navigateToCardMovements$ = createEffect(() => this.actions$.pipe(
    ofType(cardActions.navigateToCardMovements),
    tap(({ cardId }) => this.router.navigateByUrl(`dashboard/movements/${cardId}`))
  ), { dispatch: false });

  constructor(
    private cardsService: CardsService,
    private actions$: Actions,
    private snackBarService: SnackBarService,
    private router: Router
  ) { }
}
