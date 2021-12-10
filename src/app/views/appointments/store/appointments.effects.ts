import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AppointmentsService } from "../../../api/appointments.service";
import * as appointmentsActions from "./appointments.actions";
import { map, switchMap, tap } from "rxjs/operators";
import { setSpinner } from "../../../core/store/core.actions";
import { SnackBarService } from "../../../shared/services/snack-bar.service";

@Injectable()
export class AppointmentsEffects {

  public setLocations$ = createEffect(() => this.actions$.pipe(
   ofType(appointmentsActions.setAllLocations, appointmentsActions.scheduleAppointmentsSuccess),
   switchMap(() => this.appontimentsService.getAllLocations().pipe(
     map(locations => appointmentsActions.setAllLocationsSuccess({ locations }))
   ))
  ));

  public selectLocation$ = createEffect(() => this.actions$.pipe(
    ofType(appointmentsActions.selectLocation),
    switchMap(({ locationId }) => this.appontimentsService.getSlotsByLocationId(locationId).pipe(
      map(slots => appointmentsActions.setSlotsForLocationSuccess({ slots }))
    ))
  ));

  public scheduleAppointments$ = createEffect(() => this.actions$.pipe(
    ofType(appointmentsActions.scheduleAppointments),
    switchMap(({ appointments }) => this.appontimentsService.scheduleAppointment(appointments).pipe(
      switchMap(() => [appointmentsActions.scheduleAppointmentsSuccess(), appointmentsActions.setDrawer( { openDrawer: false })])
    ))
  ));

  // TODO Farlo shared
  public openSnackBar$ = createEffect(() => this.actions$.pipe(
    ofType(appointmentsActions.scheduleAppointmentsSuccess),
    tap(() => this.snackBarService.openDefaultSnackBar('Appuntamento confermato'))
  ), { dispatch: false });

  public activeSpinner$ = createEffect(() => this.actions$.pipe(
    ofType(appointmentsActions.setAllLocations, appointmentsActions.selectLocation, appointmentsActions.scheduleAppointments),
    map(() => setSpinner({ loading: true }))
  ));

  public disableSpinner$ = createEffect(() => this.actions$.pipe(
    ofType(appointmentsActions.setAllLocationsSuccess, appointmentsActions.setSlotsForLocationSuccess),
    map(() => setSpinner({ loading: false }))
  ));

  constructor(private actions$: Actions, private appontimentsService: AppointmentsService, private snackBarService: SnackBarService) { }
}
