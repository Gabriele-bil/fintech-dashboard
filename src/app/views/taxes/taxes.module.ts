import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaxesRoutingModule } from './taxes-routing.module';
import { TaxesComponent } from './taxes.component';
import { TaxpayerComponent } from './components/taxpayer.component';
import { SharedModule } from '../../shared/modules/shared.module';
import { TreasuryComponent } from './components/treasury.component';
import { InpsComponent } from './components/inps.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    TaxesComponent,
    TaxpayerComponent,
    TreasuryComponent,
    InpsComponent
  ],
  imports: [
    CommonModule,
    TaxesRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class TaxesModule { }
