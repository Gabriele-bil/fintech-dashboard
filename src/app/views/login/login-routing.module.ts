import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login.component';
import { SignInComponent } from './components/sign-in.component';
import { RegisterComponent } from './components/register.component';

const routes: Routes = [
  { path: '', component: LoginComponent,
    children: [
      { path: '', redirectTo: 'signin', pathMatch: 'full'},
      { path: 'signin', component: SignInComponent },
      { path: 'register', component: RegisterComponent },
    ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
