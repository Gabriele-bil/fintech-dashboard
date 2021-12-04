import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { getLoading$ } from "./core.selectors";
import { Observable } from "rxjs";
import { setSpinner } from "./core.actions";

@Injectable({
  providedIn: "root"
})
export class CoreFacade {
  public loading$: Observable<boolean> = this.store.select(getLoading$);

  constructor(private store: Store) { }

  public setSpinner(loading: boolean): void {
    this.store.dispatch(setSpinner({ loading }));
  }
}
