import { Component } from '@angular/core';
import { CoreFacade } from "./core/store/core/core.facade";
import { AuthFacade } from "./core/store/auth/auth.facade";

@Component({
  selector: 'ft-root',
  template: `
    <div
      *ngIf="coreFacade.loading$ | async"
      class="d-flex align-items-center justify-content-center loader"
    >
      <mat-spinner></mat-spinner>
    </div>
    <router-outlet></router-outlet>
  `,
  styles: [`
    .loader {
      width: 100vw;
      height: 100vh;
      position: fixed;
      z-index: 99;
      background-color: rgba(0, 0, 0, 0.7);
    }
  `]
})
export class AppComponent {
  constructor(public coreFacade: CoreFacade, private authFacade: AuthFacade) {
    this.authFacade.getCurrentUser();
  }
}
