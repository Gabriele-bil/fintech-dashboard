import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogComponent } from '../components/dialog.component';
import { TruncatePipe } from '../pipes/truncate.pipe';
import { MaterialModule } from './material.module';
import { DialogService } from '../services/dialog.service';
import { SnackBarService } from '../services/snack-bar.service';

const sharedDeclarations = [DialogComponent, TruncatePipe];

@NgModule({
  declarations: [...sharedDeclarations],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports: [...sharedDeclarations, MaterialModule],
  providers: [DialogService, SnackBarService],
})
export class SharedModule { }
