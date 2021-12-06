import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { Theme } from "../../../store/core.reducer";

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
      <div class="w-100 my-4">
        <div class="text-center">Dark Mode?</div>
        <div class="d-flex justify-content-center">
          <mat-icon>light_mode</mat-icon>
          <mat-icon>dark_mode</mat-icon>
        </div>
        <div class="d-flex justify-content-center">
          <mat-slide-toggle
            [checked]="actualTheme === 'dark-theme'"
            (change)="changeTheme.emit($event.checked)"
          ></mat-slide-toggle>
        </div>
      </div>
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
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavComponent {
  @Input() user: User | null = null;
  @Input() actualTheme: Theme | null = 'light-theme';
  @Output() logout = new EventEmitter<void>();
  @Output() changeTheme = new EventEmitter<boolean>();
}
