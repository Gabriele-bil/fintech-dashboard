import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Transfer } from '../models/trasfer.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransferService {

  constructor(private http: HttpClient) { }

  public transferMoney(transfer: Transfer): Observable<boolean> {
    return this.http.post<boolean>(`/transfer`, { transfer });
  }
}
