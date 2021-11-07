import { Component } from '@angular/core';

@Component({
  selector: 'ft-login',
  template: `
    <div id="container" class="d-flex justify-content-center align-items-center">
      <mat-card>
        <router-outlet></router-outlet>
      </mat-card>
    </div>
  `,
  styles: [`
    #container {
      width: 100vw;
      height: 100vh;
      background-color: #1d1d1d;
    }
  `],
})
export class LoginComponent { }
