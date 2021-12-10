import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { getLocation$, getLocations$, getOpenDrawer$, getSlots$ } from "./appointments.selectors";
import { scheduleAppointments, selectLocation, setAllLocations, setDrawer } from "./appointments.actions";
import { DayWithSlot } from "../../../models/day-with-slot";

@Injectable()
export class AppointmentsFacade {
  public locations$ = this.store.select(getLocations$);
  public location$ = (locationId: string) => this.store.select(getLocation$(locationId));
  public slots$ = this.store.select(getSlots$);
  public openDrawer$ = this.store.select(getOpenDrawer$);

  constructor(private store: Store) { }

  public setAllLocations(): void {
    this.store.dispatch(setAllLocations())
  }

  public selectLocation(locationId: string): void {
    this.store.dispatch(selectLocation({ locationId }));
  }

  public scheduleAppointments(appointments: DayWithSlot): void {
    this.store.dispatch(scheduleAppointments({ appointments }));
  }

  public setDrawer(openDrawer: boolean): void {
    this.store.dispatch(setDrawer({ openDrawer }));
  }
}
