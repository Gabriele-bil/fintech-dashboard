import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransferComponent } from './transfer.component';
import { CanDeactivateGuard } from "../../shared/guards/can-component-deactivate.guard";

const routes: Routes = [
  { path: '', component: TransferComponent, canDeactivate: [CanDeactivateGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransferRoutingModule { }
