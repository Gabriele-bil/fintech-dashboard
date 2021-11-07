import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const dashboardModule = () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule);
const loginModule = () => import('./views/login/login.module').then(m => m.LoginModule);

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', loadChildren: loginModule },
  { path: 'dashboard', loadChildren: dashboardModule },
  { path: '**', redirectTo: 'dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
