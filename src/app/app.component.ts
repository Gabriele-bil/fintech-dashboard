import { Component } from '@angular/core';
import { CoreFacade } from "./core/store/core.facade";

@Component({
  selector: 'ft-root',
  template: `
    <div [class]="coreFacade.theme$ | async">
      <div
        *ngIf="coreFacade.loading$ | async"
        class="d-flex align-items-center justify-content-center loader"
      >
        <mat-spinner></mat-spinner>
      </div>
      <router-outlet></router-outlet>
    </div>
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
  constructor(public coreFacade: CoreFacade) { }
}
