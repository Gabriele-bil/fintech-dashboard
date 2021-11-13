import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaxesService {

  constructor(private http: HttpClient) { }

  public addTaxes(taxes: any): Observable<boolean> {
    return this.http.post<boolean>(`/taxes`, { taxes }).pipe(
      tap(console.log)
    );
  }
}
