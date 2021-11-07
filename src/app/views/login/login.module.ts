import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { SignInComponent } from './components/sign-in.component';
import { RegisterComponent } from './components/register.component';
import { LoginComponent } from './login.component';
import { MaterialModule } from '../../shared/modules/material.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SignInComponent,
    RegisterComponent,
    LoginComponent,
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    MaterialModule,
    FormsModule
  ]
})
export class LoginModule { }
