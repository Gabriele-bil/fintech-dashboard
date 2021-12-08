import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { getLocation$, getLocations$, getSlots$ } from "./appointments.selectors";
import { scheduleAppointments, selectLocation, setAllLocations } from "./appointments.actions";
import { DayWithSlot } from "../../../models/day-with-slot";
import { Observable } from "rxjs";
import { Location } from "../../../models/location.model";
import { MatDrawer } from "@angular/material/sidenav";

@Injectable()
export class AppointmentsFacade {
  public locations$ = this.store.select(getLocations$);
  public slots$ = this.store.select(getSlots$);

  constructor(private store: Store) { }

  public getLocation$(locationId: string): Observable<Location | undefined> {
    return this.store.select(getLocation$, locationId);
  }

  public setAllLocations(): void {
    this.store.dispatch(setAllLocations())
  }

  public selectLocation(locationId: string, drawer: MatDrawer): void {
    this.store.dispatch(selectLocation({ locationId, drawer }));
  }

  public scheduleAppointments(appointments: DayWithSlot): void {
    this.store.dispatch(scheduleAppointments({ appointments }));
  }
}
