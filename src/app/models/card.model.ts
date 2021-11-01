import { CardType } from './types';

export interface Card {
  _id: string;
  number: string;
  ownerId: string;
  owner: string;
  type: CardType;
  amount: number;
}
