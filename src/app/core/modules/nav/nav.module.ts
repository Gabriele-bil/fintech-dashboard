import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './components/nav.component';
import { MaterialModule } from '../../../shared/modules/material.module';
import { RouterModule } from '@angular/router';

const navComponents = [NavComponent];

@NgModule({
  declarations: [...navComponents],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ],
  exports: [...navComponents]
})
export class NavModule { }
