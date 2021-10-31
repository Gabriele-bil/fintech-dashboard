import { Component } from '@angular/core';

@Component({
  selector: 'ft-root',
  template: `
    <div class="d-flex align-items-center justify-content-center">
      <ft-sign-in></ft-sign-in>
    </div>
  `,
  styles: [`
    div {
      min-height: 100vh;
    }
  `]
})
export class AppComponent {
  title = 'fintech-dashboard';
}
