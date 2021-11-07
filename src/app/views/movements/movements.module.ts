import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovementsRoutingModule } from './movements-routing.module';
import { MovementComponent } from './components/movement.component';
import { MovementsComponent } from './movements.component';
import { MovementInOutDirective } from './directives/movement-in-out.directive';
import { SharedModule } from '../../shared/modules/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    MovementComponent,
    MovementsComponent,
    MovementInOutDirective,
  ],
  imports: [
    CommonModule,
    MovementsRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class MovementsModule { }
