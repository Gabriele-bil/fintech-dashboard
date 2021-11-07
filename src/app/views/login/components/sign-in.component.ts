import { Component } from '@angular/core';

@Component({
  selector: 'ft-sign-in',
  template: `
    <form #f="ngForm" (ngSubmit)="logUser(f.value, f.invalid)">
      <mat-form-field class="w-100 mb-3" appearance="fill">
        <mat-label>Email</mat-label>
        <mat-icon matPrefix>person</mat-icon>
        <input
          type="email" matInput
          placeholder="Ex. pat@example.com"
          [ngModel] name="email" required
          #email="ngModel" email
        >
        <mat-error *ngIf="email.touched && email.errors?.email">Inserire una mail valida</mat-error>
        <mat-error *ngIf="email.touched && email.errors?.required">Questo campo è obbligatorio</mat-error>
      </mat-form-field>

      <mat-form-field appearance="fill" class="w-100 mb-3">
        <mat-label>Password</mat-label>
        <mat-icon matPrefix>lock</mat-icon>
        <input
          matInput
          [type]="hidePassword ? 'password' : 'text'"
          [ngModel] #password="ngModel"
          name="password" minlength="6" required
        >
        <button type="button" mat-icon-button matSuffix (click)="hidePassword = !hidePassword">
          <mat-icon>{{hidePassword ? 'visibility_off' : 'visibility'}}</mat-icon>
        </button>
        <mat-error *ngIf="password.touched && password.errors?.minlength">
          La password deve essere minimo di {{ password.errors?.minlength.requiredLength }} caratteri.
          Inserire altri {{ password.errors?.minlength.requiredLength - password.errors?.minlength.actualLength }}
          caratteri
        </mat-error>
        <mat-error *ngIf="email.touched && email.errors?.required">Questo campo è obbligatorio</mat-error>
      </mat-form-field>

      <button
        mat-raised-button color="primary"
        class="w-100" type="submit"
        [disabled]="f.invalid"
      >Accedi
      </button>
    </form>
    <a mat-button color="accent" routerLink="/login/register">Crea un nuovo account</a>
  `,
  styles: [``],
})
export class SignInComponent {
  public hidePassword = true;
  public email: string = '';
  public password: string = '';

  public logUser(user: { email: string, password: string }, invalid: boolean | null): void {
    if (!invalid) {
      console.log(user);
    }
  }
}
