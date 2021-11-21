import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserStore } from './user-store';
import { Observable, of } from 'rxjs';
import { Credentials } from 'src/app/models/credentials.model';
import { User } from '../../../../models/user.model';
import { catchError, mapTo, switchMap, take, tap } from 'rxjs/operators';

@Injectable(
  { providedIn: 'root' },
)
export class AuthService {

  constructor(private http: HttpClient, private router: Router, private userStore: UserStore) {
    this.http.get<void>('/csrf-token').subscribe();
  }

  public register(credentials: Credentials): Observable<boolean> {
    return this.http.post<boolean>('/register', credentials)
  }

  public login(email: string, password: string): Observable<boolean> {
    return this.http.post<boolean>('/login', { email, password }).pipe(
      switchMap(() => this.fetchUser()),
      mapTo(true),
      catchError(() => of(false)),
    );
  }

  public logout(): void {
    this.http.get<void>(`/logout`).subscribe(() => {
      this.userStore.removeUser();
      this.router.navigateByUrl('/login');
    });
  }

  public fetchUser(forceReload = false): Observable<User> {
    return this.userStore.user$.pipe(
      take(1),
      switchMap(user => {
        return (!!user && !forceReload)
               ? of(user)
               : this.http.get<any>(`/me`, {}).pipe(
            tap(u => this.userStore.setUser(u)),
          );
      }),
    );
  }
}
