import { CardType } from './types';

export interface CardForm {
  cardType: CardType;
  name: string;
  surname: string;
  cardNumber: string;
  secureCode: string;
}
