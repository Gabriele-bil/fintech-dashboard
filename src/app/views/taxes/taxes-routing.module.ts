import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaxesComponent } from './taxes.component';
import { CanDeactivateGuard } from "../../shared/guards/can-component-deactivate.guard";

const routes: Routes = [
  { path: '', component: TaxesComponent, canDeactivate: [CanDeactivateGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaxesRoutingModule { }
