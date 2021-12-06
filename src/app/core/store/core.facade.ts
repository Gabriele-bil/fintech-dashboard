import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { getLoading$, getTheme$ } from "./core.selectors";
import { Observable } from "rxjs";
import { setSpinner, setTheme } from "./core.actions";
import { Theme } from "./core.reducer";
import { delay } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class CoreFacade {
  public loading$: Observable<boolean> = this.store.select(getLoading$).pipe(delay(0)); // Ho dovuto aggiungere il delay altrimenti mi dava: ExpressionChangedAfterItHasBeenCheckedError
  public theme$: Observable<Theme> = this.store.select(getTheme$);

  constructor(private store: Store) {
    const theme = localStorage.getItem('theme') as Theme | null;

    if (theme) {
      this.setTheme(theme);
    }
  }

  public setSpinner(loading: boolean): void {
    this.store.dispatch(setSpinner({ loading }));
  }

  public setTheme(theme: Theme): void {
    this.store.dispatch(setTheme({ theme }));
  }
}
