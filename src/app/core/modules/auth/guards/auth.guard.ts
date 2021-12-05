import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, mapTo, take } from 'rxjs/operators';
import { AuthFacade } from "../../../store/auth/auth.facade";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authFacade: AuthFacade) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    /*return this.authService.fetchUser().pipe(
      take(1),
      mapTo(true),
      catchError(() => {
        this.router.navigateByUrl('/login');
        return of(false);
      })
    );*/
    return this.authFacade.user$.pipe(
      take(1),
      mapTo(true),
      catchError(() => {
        this.authFacade.clearUser()
        return of(false);
      })
    );
  }

}
