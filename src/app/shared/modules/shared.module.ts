import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogComponent } from '../components/dialog.component';
import { TruncatePipe } from '../pipes/truncate.pipe';
import { MaterialModule } from './material.module';

const sharedDeclarations = [DialogComponent, TruncatePipe];

@NgModule({
  declarations: [...sharedDeclarations],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [...sharedDeclarations, MaterialModule],
})
export class SharedModule { }
