import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../../../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserStore {
  private _user$ = new BehaviorSubject<User | null>(null);
  public user$ = this._user$.asObservable();

  public setUser(user: User): void {
    this._user$.next(user);
  }

  public removeUser(): void {
    this._user$.next(null);
  }
}
