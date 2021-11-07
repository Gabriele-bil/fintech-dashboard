import { Component } from '@angular/core';

@Component({
  selector: 'ft-register',
  template: `
    <form #f="ngForm" (ngSubmit)="createUser(f.value, f.invalid)">
      <mat-form-field class="w-100 mb-3" appearance="fill">
        <mat-label>Email</mat-label>
        <input
          type="email" matInput
          placeholder="Ex. pat@example.com"
          [ngModel] name="email" required
          #email="ngModel" email
        >
        <mat-error *ngIf="email.touched && email.errors?.email">Inserire una mail valida</mat-error>
        <mat-error *ngIf="email.touched && email.errors?.required">Email richiesta</mat-error>
      </mat-form-field>

      <mat-form-field class="w-100 mb-3" appearance="fill">
        <mat-label>Nome</mat-label>
        <input
          type="text" matInput
          [ngModel] name="name" required
          #name="ngModel"
        >
        <mat-error *ngIf="name.touched && name.errors?.required">Nome richiesto</mat-error>
      </mat-form-field>

      <mat-form-field class="w-100 mb-3" appearance="fill">
        <mat-label>Cognome</mat-label>
        <input
          type="text" matInput
          [ngModel] name="surname" required
          #surname="ngModel"
        >
        <mat-error *ngIf="surname.touched && surname.errors?.required">Cognome richiesto</mat-error>
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
        <mat-error *ngIf="password.touched && password.errors?.required">Questo campo è obbligatorio</mat-error>
      </mat-form-field>

      <mat-form-field appearance="fill" class="w-100">
        <mat-label>Ripeti Password</mat-label>
        <mat-icon matPrefix>lock</mat-icon>
        <input
          matInput
          [type]="hideConfirmPassword ? 'password' : 'text'"
          [ngModel] #confirmPassword="ngModel"
          name="confirmPassword" minlength="6" required
        >
        <button type="button" mat-icon-button matSuffix (click)="hideConfirmPassword = !hideConfirmPassword">
          <mat-icon>{{hideConfirmPassword ? 'visibility_off' : 'visibility'}}</mat-icon>
        </button>
        <mat-error *ngIf="confirmPassword.touched && confirmPassword.errors?.minlength">
          La password deve essere minimo di {{ confirmPassword.errors?.minlength.requiredLength }} caratteri.
          Inserire altri
          {{ confirmPassword.errors?.minlength.requiredLength - confirmPassword.errors?.minlength.actualLength }}
          caratteri
        </mat-error>
        <mat-error *ngIf="confirmPassword.touched && confirmPassword.errors?.required">
          Questo campo è obbligatorio
        </mat-error>
      </mat-form-field>
      <mat-error *ngIf="confirmPassword.touched && confirmPassword.value !== password.value">
        Le due password non coincidono
      </mat-error>

      <button
        mat-raised-button color="primary"
        class="w-100 mt-3" type="submit"
        [disabled]="f.invalid || password.value !== confirmPassword.value"
      >Accedi
      </button>
    </form>

    <a mat-button color="accent" routerLink="/login/signin">Hai già un account? Accedi</a>
  `,
  styles: [],
})
export class RegisterComponent {
  public hidePassword = true;
  public hideConfirmPassword = true;

  public createUser(
    user: { email: string, name: string, surname: string, password: string, confirmPassword: string },
    invalid: boolean | null,
  ) {
    if (!invalid) {
      //TODO controllare che le password siano uguali
      console.log(user);
    }
  }

}
