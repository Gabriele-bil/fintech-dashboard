import { CardsService } from '../../api/cards.service';
import { AsyncValidatorFn } from '@angular/forms';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Card } from '../../models/card.model';

@Injectable()
export class TransferValidators {
  constructor(private cardsService: CardsService) { }

  public transferValidator(): AsyncValidatorFn {
    return (control => this.cardsService.getAll().pipe(
        map(cards => cards.find(card => card._id === control.get('card')?.value)!),
        map(card => card && card.amount < control.get('amount')?.value ? { 'transfer': true } : null),
      )
    );
  }

  public cardIdValidator(): AsyncValidatorFn {
    return (control => this.cardsService.getAll().pipe(
      map(cards => cards.find(card => card._id === control.value)),
      map((card: Card | undefined) => card ? null : { 'cardId': true }),
    ));
  }
}
