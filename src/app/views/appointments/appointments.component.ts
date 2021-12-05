import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Location } from '../../models/location.model';
import { DayWithSlots } from '../../models/day-with-slots.model';
import { DialogService } from '../../shared/services/dialog.service';
import { DayWithSlot } from '../../models/day-with-slot';
import { SnackBarService } from '../../shared/services/snack-bar.service';
import { MatDrawer, MatSidenav } from '@angular/material/sidenav';
import { AppointmentsService } from '../../api/appointments.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from "rxjs/operators";
import { CoreFacade } from "../../core/store/core/core.facade";

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
          *ngIf="selectedLocation$ | async as selectedLocation"
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
export class AppointmentsComponent implements OnInit, OnDestroy {
  @ViewChild('drawer') drawer!: MatSidenav;

  public locations$ = new BehaviorSubject<Location[]>([]);
  public selectedLocation$ = new BehaviorSubject<Location | null>(null);
  public slots: DayWithSlots[] = [];

  private destroy$ = new Subject<void>()

  constructor(
    private dialogService: DialogService,
    private snackBarService: SnackBarService,
    private appointmentsService: AppointmentsService,
    private coreFacade: CoreFacade
  ) { }

  public ngOnInit(): void {
    this.getLocation();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
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
        this.coreFacade.setSpinner(true);
        this.appointmentsService.scheduleAppointment(dayWithSlot)
          .pipe(takeUntil(this.destroy$))
          .subscribe((res) => {
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
    this.coreFacade.setSpinner(true);
    this.appointmentsService.getSlotsByLocationId(location._id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(slots => {
        this.slots = slots;
        drawer.open();
        this.coreFacade.setSpinner(false);
        this.selectedLocation$.next(location);
      });
  }

  private getLocation(): void {
    this.coreFacade.setSpinner(true);
    this.appointmentsService.getAllLocations()
      .pipe(takeUntil(this.destroy$))
      .subscribe(locations => {
        this.locations$.next(locations);
        this.coreFacade.setSpinner(false);
      });
  }
}
