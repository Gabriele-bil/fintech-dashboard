import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '../../models/location.model';
import { DayWithSlots } from '../../models/day-with-slots.model';
import { DialogService } from '../../shared/services/dialog.service';
import { DayWithSlot } from '../../models/day-with-slot';
import { SnackBarService } from '../../shared/services/snack-bar.service';
import { MatDrawer, MatSidenav } from '@angular/material/sidenav';
import { AppointmentsService } from '../../api/appointments.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'ft-appointments',
  template: `
    <mat-drawer-container autosize id="container">
      <ft-appointments-list
        [locations]="locations$ | async"
        (selectedLocation)="selectLocation($event, drawer)"
      >
      </ft-appointments-list>

      <mat-drawer #drawer mode="side" position="end">
        <ft-appointments-select-date
          *ngIf="selectedLocation"
          [location]="selectedLocation"
          [slotsDay]="slots"
          (selectedDayWithSlot)="openConfirmDialog($event)"
        >
        </ft-appointments-select-date>
      </mat-drawer>
    </mat-drawer-container>
  `,
  styles: [`
    #container {
      height: calc(100vh - 64px);
    }
  `],
})
export class AppointmentsComponent implements OnInit {
  @ViewChild('drawer') drawer!: MatSidenav;

  public locations$: Observable<Location[]> | null = null;
  public slots: DayWithSlots[] = [];
  public selectedLocation: Location | null = null;

  constructor(
    private dialogService: DialogService,
    private snackBarService: SnackBarService,
    private appointmentsService: AppointmentsService,
  ) { }

  public ngOnInit(): void {
    this.getLocation();
  }

  public openConfirmDialog(dayWithSlot: DayWithSlot): void {
    const dialogRef = this.dialogService.openDefaultDialog({
      title: `Confermi l'appuntamento`,
      message: `L'appuntamento sarà fissato per il giorno ${ dayWithSlot.day.split('-').join('/') } alle ${ dayWithSlot.slot }`,
      rejectedCtaText: 'Annulla',
      confirmCtaText: 'Conferma',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.appointmentsService.scheduleAppointment(dayWithSlot).subscribe((res) => {
          if (res) {
            this.snackBarService.openDefaultSnackBar('Appuntamento confermato');
            this.drawer.close();
            this.getLocation();
          }
        })
      }
    });
  }

  public selectLocation(location: Location, drawer: MatDrawer): void {
    this.appointmentsService.getSlotsByLocationId(location._id).subscribe(slots => {
      this.slots = slots;
      drawer.open();
      this.selectedLocation = location;
    });
  }

  private getLocation(): void {
    this.locations$ = this.appointmentsService.getAllLocations();
  }
}
