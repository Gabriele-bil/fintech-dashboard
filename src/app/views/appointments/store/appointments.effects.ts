import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AppointmentsService } from "../../../api/appointments.service";
import * as appointmentsActions from "./appointments.actions";
import { map, switchMap, tap } from "rxjs/operators";
import { setSpinner } from "../../../core/store/core.actions";

@Injectable()
export class AppointmentsEffects {

  public setLocations$ = createEffect(() => this.actions$.pipe(
   ofType(appointmentsActions.setAllLocations),
   switchMap(() => this.appontimentsService.getAllLocations().pipe(
     map(locations => appointmentsActions.setAllLocationsSuccess({ locations }))
   ))
  ));

  /*public setSlots$ = createEffect(() => this.actions$.pipe(
    ofType(appointmentsActions.setSlotsForLocation),
    switchMap(({ locationId }) => this.appontimentsService.getSlotsByLocationId(locationId).pipe(
      map(slots => appointmentsActions.setSlotsForLocationSuccess({ slots }))
    ))
  ));*/

  public scheduleAppointments$ = createEffect(() => this.actions$.pipe(
    ofType(appointmentsActions.scheduleAppointments),
    switchMap(({ appointments }) => this.appontimentsService.scheduleAppointment(appointments).pipe(
      map(() => appointmentsActions.setAllLocations())
    ))
  ));

  public selectLocation$ = createEffect(() => this.actions$.pipe(
    ofType(appointmentsActions.selectLocation),
    switchMap(({ locationId , drawer}) => this.appontimentsService.getSlotsByLocationId(locationId).pipe(
      tap(() => drawer.open()),
      map(slots => appointmentsActions.setSlotsForLocationSuccess({ slots }))
    ))
  ));

  public activeSpinner$ = createEffect(() => this.actions$.pipe(
    ofType(appointmentsActions.setAllLocations, appointmentsActions.selectLocation),
    map(() => setSpinner({ loading: true }))
  ));

  public disableSpinner$ = createEffect(() => this.actions$.pipe(
    ofType(appointmentsActions.setAllLocationsSuccess, appointmentsActions.setSlotsForLocationSuccess),
    map(() => setSpinner({ loading: false }))
  ));

  constructor(private actions$: Actions, private appontimentsService: AppointmentsService) { }
}
