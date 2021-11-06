import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ft-nav',
  template: `
    <mat-drawer-container id="container">
      <mat-drawer mode="side" opened>
        <mat-toolbar color="accent">
          <span>Menu</span>
        </mat-toolbar>
        <mat-list>
          <mat-list-item>
            <mat-icon class="me-3">home</mat-icon>
            Home
          </mat-list-item>
          <mat-list-item>
            <mat-icon class="me-3">credit_card</mat-icon>
            Carte
          </mat-list-item>
          <mat-list-item>
            <mat-icon class="me-3">receipt_long</mat-icon>
            Movimenti
          </mat-list-item>
          <mat-list-item>
            <mat-icon class="me-3">paid</mat-icon>
            Trasferisci
          </mat-list-item>
          <mat-list-item>
            <mat-icon class="me-3">today</mat-icon>
            Appuntamenti
          </mat-list-item>
          <mat-list-item>
            <mat-icon class="me-3">receipt</mat-icon>
            Tasse
          </mat-list-item>
          <mat-list-item>
            <mat-icon class="me-3">person</mat-icon>
            <div>
              <p class="mb-0">Gabriele Bilello</p>
              <small>Logout</small>
            </div>
          </mat-list-item>
        </mat-list>
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

    mat-list-item:hover {
      background-color: #ffc400;
      color: #000;
      cursor: pointer;
      transition: all 0.2s ease-in-out;
    }
  `]
})
export class NavComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
