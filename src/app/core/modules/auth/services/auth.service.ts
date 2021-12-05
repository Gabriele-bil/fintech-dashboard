import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Credentials } from 'src/app/models/credentials.model';
import { User } from '../../../../models/user.model';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
    this.http.get<void>('/csrf-token').subscribe();
  }

  public register(credentials: Credentials): Observable<User> {
    return this.http.post<boolean>('/register', credentials).pipe(
      switchMap(() => this.login(credentials.email, credentials.password))
    );
  }

  public login(email: string, password: string): Observable<User> {
    return this.http.post<boolean>('/login', { email, password }).pipe(
      switchMap(() => this.getCurrentUser())
    );
  }

  public logout(): Observable<void> {
    return this.http.get<void>(`/logout`);
  }

  public getCurrentUser(): Observable<User> {
    return this.http.get<User>('/me');
  }

  /*public fetchUser(forceReload = false): Observable<User> {
    return this.userStore.user$.pipe(
      take(1),
      switchMap(user =>
        (!!user && !forceReload)
          ? of(user)
          : this.http.get<any>(`/me`, {})
      ),
    );

  }*/
}
