import { Component, ViewChild } from '@angular/core';
import { Location } from '../models/location.model';
import { MOCK_LOCATIONS } from '../shared/mock-data/mock-locations';
import { DayWithSlots } from '../models/day-with-slots.model';
import { MOCK_SLOTS } from '../shared/mock-data/mock-slots';
import { DialogService } from '../shared/services/dialog.service';
import { DayWithSlot } from '../models/day-with-slot';
import { SnackBarService } from '../shared/services/snack-bar.service';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'ft-appointments',
  template: `
    <mat-drawer-container autosize>
      <ft-appointments-list
        [locations]="locations"
        (selectedLocation)="selectedLocation = $event; drawer.open()"
      >
      </ft-appointments-list>

      <mat-drawer #drawer mode="side" position="end">
        <ft-appointments-select-date
          *ngIf="selectedLocation"
          [location]="selectedLocation"
          [slots]="slots"
          (selectedDayWithSlot)="openConfirmDialog($event)"
        >
        </ft-appointments-select-date>
      </mat-drawer>
    </mat-drawer-container>
  `,
  styles: [`
    mat-drawer-container {
      width: 100vw;
      height: 100vh;
    }
  `],
})
export class AppointmentsComponent {
  @ViewChild('drawer') drawer!: MatSidenav;

  public locations: Location[] = MOCK_LOCATIONS;
  public slots: DayWithSlots[] = MOCK_SLOTS;
  public selectedLocation: Location | null = null;

  constructor(
    private dialogService: DialogService,
    private snackBarService: SnackBarService,
  ) { }

  public openConfirmDialog(dayWithSlot: DayWithSlot): void {
    const dialogRef = this.dialogService.openDefaultDialog({
      title: `Confermi l'appuntamento`,
      message: `L'appuntamento sarà fissato per il giorno ${ dayWithSlot.day.split('-').join('/') } alle ${ dayWithSlot.slot }`,
      rejectedCtaText: 'Annulla',
      confirmCtaText: 'Conferma',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.snackBarService.openDefaultSnackBar('Appuntamento confermato');
        this.drawer.close();
      }
    });
  }
}
