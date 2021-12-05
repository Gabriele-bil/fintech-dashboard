import { Component } from '@angular/core';
import { AuthFacade } from "../../core/store/auth/auth.facade";

@Component({
  selector: 'ft-dashboard',
  template: `
    <mat-drawer-container id="container">
      <mat-drawer mode="side" opened>
        <mat-toolbar color="accent">
          <span>Menu</span>
        </mat-toolbar>
        <ft-nav [user]="user$ | async" (logout)="logout()"></ft-nav>
      </mat-drawer>

      <mat-drawer-content>
        <mat-toolbar>
          <span>NgFintech</span>
        </mat-toolbar>
        <router-outlet></router-outlet>
      </mat-drawer-content>
    </mat-drawer-container>

  `,
  styles: [`
    #container {
      min-height: 100vh;
    }
  `],
})
export class DashboardComponent {
  public user$ = this.authFacade.user$;

  constructor(private authFacade: AuthFacade) { }

  public logout(): void {
    this.authFacade.logout();
  }
}
