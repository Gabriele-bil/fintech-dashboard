import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { getUser$ } from "./auth.selectors";
import * as authActions from "./auth.actions";
import { Credentials } from "src/app/models/credentials.model";

@Injectable({
  providedIn: "root"
})
export class AuthFacade {
  public user$ = this.store.select(getUser$);

  constructor(private store: Store) { }

  public login(email: string, password: string): void {
    console.log(email, password);
    this.store.dispatch(authActions.login({ email, password }));
  }

  public signup(credentials: Credentials): void {
    this.store.dispatch(authActions.signup({ credentials }));
  }

  public logout(): void {
    this.store.dispatch(authActions.logout());
  }

  public getCurrentUser(): void {
    this.store.dispatch(authActions.getCurrentUser());
  }

  public clearUser(): void {
    this.store.dispatch(authActions.clearUser());
  }
}
