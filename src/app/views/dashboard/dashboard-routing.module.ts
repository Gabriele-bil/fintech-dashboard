import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

const appointmentsModule = () => import('./../appointments/appointments.module').then(m => m.AppointmentsModule);
const cardsModule = () => import('./../cards/cards.module').then(m => m.CardsModule);
const movementsModule = () => import('./../movements/movements.module').then(m => m.MovementsModule);
const taxes = () => import('./../taxes/taxes.module').then(m => m.TaxesModule);
const transfer = () => import('./../transfer/transfer.module').then(m => m.TransferModule);

const routes: Routes = [
  {
    path: '', component: DashboardComponent, children: [
      { path: 'appointments', loadChildren: appointmentsModule },
      { path: 'cards', loadChildren: cardsModule },
      { path: 'movements', loadChildren: movementsModule },
      { path: 'taxes', loadChildren: taxes },
      { path: 'transfer', loadChildren: transfer },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule { }
