import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from '../components/dialog.component';
import { DialogData } from '../../models/dialog-data.model';
import { ComponentType } from '@angular/cdk/overlay';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  public openDefaultDialog(data: DialogData): MatDialogRef<DialogComponent> {
    return this.dialog.open<DialogComponent>(DialogComponent, { data });
  }

  public openCustomDialog(component: ComponentType<unknown>, data?: unknown): MatDialogRef<any> {
    return this.dialog.open<unknown>(component, { data });
  }
}
