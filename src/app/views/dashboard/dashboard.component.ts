import { Component } from '@angular/core';
import { AuthService } from '../../core/modules/auth/services/auth.service';
import { UserStore } from '../../core/modules/auth/services/user-store';
import { tap } from 'rxjs/operators';

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
  public user$ = this.userStore.user$;

  constructor(private authService: AuthService, private userStore: UserStore) {
  }

  public logout(): void {
    this.authService.logout();
  }
}
