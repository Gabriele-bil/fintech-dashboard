import { Component } from '@angular/core';

@Component({
  selector: 'ft-login',
  template: `
    <mat-card id="container">
      <ng-container *ngIf="showView === 'sign-in'; else register">
        <ft-sign-in></ft-sign-in>
      </ng-container>

      <ng-template #register>
        <ft-register></ft-register>
      </ng-template>
      <button mat-button color="accent" class="mt-2 ps-0" (click)="toggleView()">
        {{ showView === 'register' ? "Hai già un'account? Accedi" : "Crea un nuovo account" }}
      </button>
    </mat-card>
  `,
  styles: [`
    #container {
      max-width: 500px;
    }
  `],
})
export class LoginComponent {
  public showView: 'register' | 'sign-in' = 'sign-in';

  public toggleView(): void {
    this.showView = this.showView === 'register' ? 'sign-in' : 'register';
  }

}
