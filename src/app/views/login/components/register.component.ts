import { Component } from '@angular/core';
import { RegisterErrorStateMatcher } from '../utility/register-error-state-matcher';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { equalFieldsValidator } from '../../../shared/validators/equal-fields.validator';
import { AuthFacade } from "../../../core/store/auth/auth.facade";

@Component({
  selector: 'ft-register',
  template: `
    <form
      [formGroup]="registerForm"
      (ngSubmit)="createUser()"
    >
      <mat-form-field class="w-100 mb-3" appearance="fill">
        <mat-label>Email</mat-label>
        <input
          type="email" matInput
          placeholder="Ex. gabriele@mail.com"
          formControlName="email"
        >
        <mat-error *ngIf="email.touched && email.errors?.email">Inserire una mail valida</mat-error>
        <mat-error *ngIf="email.touched && email.errors?.required">Email richiesta</mat-error>
      </mat-form-field>

      <mat-form-field class="w-100 mb-3" appearance="fill">
        <mat-label>Nome</mat-label>
        <input
          type="text" matInput
          formControlName="name"
        >
        <mat-error *ngIf="name.touched && name.errors?.required">Nome richiesto</mat-error>
      </mat-form-field>

      <mat-form-field class="w-100 mb-3" appearance="fill">
        <mat-label>Cognome</mat-label>
        <input
          type="text" matInput
          formControlName="surname"
        >
        <mat-error *ngIf="surname.touched && surname.errors?.required">Cognome richiesto</mat-error>
      </mat-form-field>

      <mat-form-field appearance="fill" class="w-100 mb-3">
        <mat-label>Password</mat-label>
        <mat-icon matPrefix>lock</mat-icon>
        <input
          matInput
          [type]="hidePassword ? 'password' : 'text'"
          formControlName="password"
          [errorStateMatcher]="errorStateMatcher"
        >
        <button type="button" mat-icon-button matSuffix (click)="hidePassword = !hidePassword" tabindex="-1">
          <mat-icon>{{ hidePassword ? 'visibility_off' : 'visibility' }}</mat-icon>
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
          formControlName="confirmPassword"
          [errorStateMatcher]="errorStateMatcher"
        >
        <button type="button" mat-icon-button matSuffix (click)="hideConfirmPassword = !hideConfirmPassword"
                tabindex="-1">
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

      <mat-error *ngIf="registerForm.errors?.equalFields">
        {{ registerForm.errors?.equalFields }}
      </mat-error>

      <button
        mat-raised-button color="primary"
        class="w-100 mt-3" type="submit"
        [disabled]="!registerForm.valid"
      >Registrati
      </button>
    </form>

    <a mat-button color="accent" routerLink="/login/signin">Hai già un account? Accedi</a>
  `,
})
export class RegisterComponent {
  public hidePassword = true;
  public hideConfirmPassword = true;
  public errorStateMatcher = new RegisterErrorStateMatcher();

  public registerForm = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    name: ['', [Validators.required]],
    surname: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
  }, { validators: [equalFieldsValidator('password', 'confirmPassword')] });

  constructor(
    private fb: FormBuilder,
    private authFacade: AuthFacade
  ) { }

  public get email(): AbstractControl {
    return this.registerForm.get('email')!;
  }

  public get name(): AbstractControl {
    return this.registerForm.get('name')!;
  }

  public get surname(): AbstractControl {
    return this.registerForm.get('surname')!;
  }

  public get password(): AbstractControl {
    return this.registerForm.get('password')!;
  }

  public get confirmPassword(): AbstractControl {
    return this.registerForm.get('confirmPassword')!;
  }

  public createUser() {
    if (this.registerForm.valid) {
      const { email, password, name, surname } = this.registerForm.value;
      this.authFacade.signup({ email, password, name, surname });
    }
  }
}
