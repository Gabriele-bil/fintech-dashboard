import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../core/modules/auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ft-sign-in',
  template: `
    <form (ngSubmit)="logUser()" [formGroup]="loginForm">
      <mat-form-field class="w-100 mb-3" appearance="fill">
        <mat-label>Email</mat-label>
        <mat-icon matPrefix>person</mat-icon>
        <input
          type="email" matInput
          placeholder="Ex. gabriele@mail.com"
          formControlName="email"
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
          formControlName="password"
        >
        <button type="button" mat-icon-button matSuffix (click)="hidePassword = !hidePassword">
          <mat-icon>{{ hidePassword ? 'visibility_off' : 'visibility' }}</mat-icon>
        </button>

        <mat-error *ngIf="password.touched && password.errors?.minlength">
          La password deve essere minimo di {{ password.errors?.minlength.requiredLength }} caratteri.
          Inserire altri {{ password.errors?.minlength.requiredLength - password.errors?.minlength.actualLength }}
          caratteri
        </mat-error>
        <mat-error *ngIf="password.touched && password.errors?.required">Questo campo è obbligatorio</mat-error>
      </mat-form-field>

      <button
        mat-raised-button color="primary"
        class="w-100" type="submit"
        [disabled]="!loginForm.valid"
      >Accedi
      </button>
    </form>
    <a mat-button color="accent" routerLink="/login/register">Crea un nuovo account</a>
  `,
})
export class SignInComponent {
  public hidePassword = true;

  public loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  })

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  public get email(): AbstractControl {
    return this.loginForm.get('email')!;
  }

  public get password(): AbstractControl {
    return this.loginForm.get('password')!;
  }

  public logUser(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.email.value, this.password.value)
        .subscribe(() => this.router.navigateByUrl('/dashboard'));
    }
  }
}
