import { Injectable } from "@angular/core";
import { AuthService } from "../../modules/auth/services/auth.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as authActions from "./auth.actions";
import { catchError, map, switchMap, take, tap } from "rxjs/operators";
import { SnackBarService } from "../../../shared/services/snack-bar.service";
import { of } from "rxjs";
import { Router } from "@angular/router";

@Injectable()
export class AuthEffects {

  public login$ = createEffect(() => this.actions$.pipe(
    ofType(authActions.login),
    switchMap(({ email, password }) => this.authService.login(email, password).pipe(
      map(user => authActions.setUser({ user })),
      catchError((err) => {
        this.snackBarService.openDefaultSnackBar('Qualcosa è andato storto con il login', 'Chiudi')
        return of(err)
      })
    ))
  ));

  public signup$ = createEffect(() => this.actions$.pipe(
    ofType(authActions.signup),
    switchMap(({ credentials }) => this.authService.register(credentials).pipe(
      map(user => authActions.setUser({ user }))
    ))
  ));

  public redirectToDashboard$ = createEffect(() => this.actions$.pipe(
    ofType(authActions.setUser),
    tap(() => this.router.navigateByUrl('/dashboard'))
  ), { dispatch: false });

  public logout$ = createEffect(() => this.actions$.pipe(
    ofType(authActions.logout),
    switchMap(() => this.authService.logout().pipe(
      map(() => authActions.clearUser())
    ))
  ));

  public redirectToLogin$ = createEffect(() => this.actions$.pipe(
    ofType(authActions.clearUser),
    tap(() => this.router.navigateByUrl('/login'))
  ), { dispatch: false });

  public getCurrentUser$ = createEffect(() => this.actions$.pipe(
    ofType(authActions.getCurrentUser),
    switchMap(() => this.authService.getCurrentUser().pipe(
      take(1),
      map(user => {
        this.router.navigateByUrl('/dashboard');
        return authActions.setUser({ user })
      }),
      catchError((err) => {
        this.router.navigateByUrl('/login');
        return of(err);
      })
    ))
  ));

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private snackBarService: SnackBarService,
    private router: Router
  ) { }
}
