import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(private matSnackBar: MatSnackBar) { }

  public openDefaultSnackBar(message: string, action: string = 'Chiudi'): void {
    this.matSnackBar.open(message, action, { duration: 3000 });
  }
}
