import { Component } from '@angular/core';

@Component({
  selector: 'ft-root',
  template: `
    <div class="d-flex align-items-center justify-content-center">
      <ft-login></ft-login>
    </div>
  `,
  styles: [
    `
    div {
      min-height: 100vh;
      background-color: #111112;
    }
  `]
})
export class AppComponent {
  title = 'fintech-dashboard';
}
