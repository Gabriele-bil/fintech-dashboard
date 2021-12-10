import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Location } from '../../models/location.model';
import { DayWithSlots } from '../../models/day-with-slots.model';
import { DialogService } from '../../shared/services/dialog.service';
import { DayWithSlot } from '../../models/day-with-slot';
import { SnackBarService } from '../../shared/services/snack-bar.service';
import { MatSidenav } from '@angular/material/sidenav';
import { AppointmentsService } from '../../api/appointments.service';
import { Observable, Subject } from 'rxjs';
import { takeUntil, tap } from "rxjs/operators";
import { CoreFacade } from "../../core/store/core.facade";
import { AppointmentsFacade } from "./store/appointments.facade";

@Component({
  selector: 'ft-appointments',
  template: `
    <mat-drawer-container autosize id="container">
      <ft-appointments-list
        [locations]="locations$ | async"
        (selectedLocation)="selectLocation($event)"
      >
      </ft-appointments-list>

      <mat-drawer #drawer mode="side" position="end">
        <ft-appointments-select-date
          *ngIf="selectedLocation$ | async as selectedLocation"
          [location]="selectedLocation"
          [slotsDay]="slots$ | async"
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
export class AppointmentsComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('drawer') drawer!: MatSidenav;
  private destroy$ = new Subject<void>()

  public locations$ = this.appointmentsFacade.locations$.pipe(takeUntil(this.destroy$));
  public selectedLocation$: Observable<Location | undefined> | null = null;
  public slots: DayWithSlots[] = [];
  public slots$ = this.appointmentsFacade.slots$.pipe(takeUntil(this.destroy$));

  constructor(
    private dialogService: DialogService,
    private snackBarService: SnackBarService,
    private appointmentsService: AppointmentsService,
    private coreFacade: CoreFacade,
    private appointmentsFacade: AppointmentsFacade
  ) { }

  public ngOnInit(): void {
    this.appointmentsFacade.setDrawer(false);
    this.appointmentsFacade.setAllLocations();
  }

  public ngAfterViewInit(): void {
    this.appointmentsFacade.openDrawer$.pipe(
      takeUntil(this.destroy$),
      tap(status => status ? this.drawer?.open() : this.drawer?.close())
    ).subscribe();
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
        this.appointmentsFacade.scheduleAppointments(dayWithSlot);
      }
    });
  }

  public selectLocation(location: Location): void {
    this.selectedLocation$ = this.appointmentsFacade.location$(location._id).pipe(takeUntil(this.destroy$));
    this.appointmentsFacade.selectLocation(location._id);
  }
}
