import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../../../models/user.model';

@Component({
  selector: 'ft-nav',
  template: `
    <mat-list>
      <mat-list-item routerLink="/dashboard" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">
        <mat-icon class="me-3">home</mat-icon>
        Home
      </mat-list-item>
      <mat-list-item routerLink="cards" routerLinkActive="active">
        <mat-icon class="me-3">credit_card</mat-icon>
        Carte
      </mat-list-item>
      <mat-list-item routerLink="movements" routerLinkActive="active">
        <mat-icon class="me-3">receipt_long</mat-icon>
        Movimenti
      </mat-list-item>
      <mat-list-item routerLink="transfer" routerLinkActive="active">
        <mat-icon class="me-3">paid</mat-icon>
        Trasferisci
      </mat-list-item>
      <mat-list-item routerLink="appointments" routerLinkActive="active">
        <mat-icon class="me-3">today</mat-icon>
        Appuntamenti
      </mat-list-item>
      <mat-list-item routerLink="taxes" routerLinkActive="active">
        <mat-icon class="me-3">receipt</mat-icon>
        Tasse
      </mat-list-item>
      <mat-list-item (click)="logout.emit()">
        <mat-icon class="me-3">person</mat-icon>
        <div>
          <p class="mb-0">{{ user?.displayName }}</p>
          <small>Logout</small>
        </div>
      </mat-list-item>
    </mat-list>
  `,
  styles: [`
    mat-list-item.active, mat-list-item:hover {
      background-color: #ffc400;
      color: #000;
      cursor: pointer;
      transition: all 0.2s ease-in-out;
    }
  `],
})
export class NavComponent {
  @Input() user: User | null = null;
  @Output() logout = new EventEmitter<void>();
}
