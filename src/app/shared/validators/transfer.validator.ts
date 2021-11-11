import { CardsService } from '../../api/cards.service';
import { AsyncValidatorFn } from '@angular/forms';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TransferValidators {
  constructor(private cardsService: CardsService) {
  }

  public transferValidator(): AsyncValidatorFn {
    return (control => this.cardsService.getAll().pipe(
        map(cards => cards.find(card => card._id === control.get('card')?.value)!),
        map(card => card.amount < control.get('amount')?.value ? { 'transfer': true } : null),
      )
    );
  }
}

// TODO DIRECTIVE ASYNC VALIDATOR
