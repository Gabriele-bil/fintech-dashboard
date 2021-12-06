import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { setTheme } from "./core.actions";
import { tap } from "rxjs/operators";

@Injectable()
export class CoreEffects {

  public setTheme$ = createEffect(() => this.action$.pipe(
    ofType(setTheme),
    tap(({ theme }) => localStorage.setItem('theme', theme))
  ), { dispatch: false });

  constructor(private action$: Actions) { }
}
