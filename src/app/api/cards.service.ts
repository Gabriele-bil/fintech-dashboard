import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Card } from '../models/card.model';
import { CardForm } from '../models/card-form.model';
import { PaginatedMovements } from '../models/movement.model';

@Injectable({
  providedIn: 'root'
})
export class CardsService {

  constructor(private http: HttpClient) { }

  public getAll(): Observable<Card[]> {
    return this.http.get<Card[]>(`/cards`);
  }

  public addCard(card: CardForm): Observable<Card> {
    return this.http.post<Card>(`/cards`, { card });
  }

  public deleteCard(cardId: string): Observable<boolean> {
    return this.http.delete<boolean>(`/cards/${cardId}`);
  }

  public getCardMovements(cardId: string, limit?: number, offset?: number): Observable<PaginatedMovements> {
    let params = new HttpParams();

    if (limit) {
      params = params.set('limit', limit);
    }

    if (offset) {
      params = params.set('offset', offset);
    }

    return this.http.get<PaginatedMovements>(`/cards/${cardId}/movements`, { params });
  }
}
