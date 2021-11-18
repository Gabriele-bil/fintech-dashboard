import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comune } from '../models/comuni.model';

@Injectable({
  providedIn: 'root'
})
export class ComuniService {

  constructor(private http: HttpClient) { }

  public getItalianProvices(): Observable<Comune[]> {
    return this.http.get<Comune[]>('https://raw.githubusercontent.com/matteocontrini/comuni-json/master/comuni.json')
  }
}
