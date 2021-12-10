import { createAction, props } from "@ngrx/store";
import { Location } from "src/app/models/location.model";
import { DayWithSlots } from "src/app/models/day-with-slots.model";
import { DayWithSlot } from "src/app/models/day-with-slot";

export const setAllLocations = createAction('[Appointments] Set all locations');
export const setAllLocationsSuccess = createAction('[Appointments] Set all locations success', props<{ locations: Location[] }>());

export const selectLocation = createAction('[Appointments] Select Location', props<{ locationId: string }>());
export const setSlotsForLocationSuccess = createAction('[Appointments] Set slots for location success', props<{ slots: DayWithSlots[] }>());
export const resetSlotsForLocation = createAction('[Appointments] Reset slots for location');

export const scheduleAppointments = createAction('[Appointments] Schedule appointments', props<{ appointments: DayWithSlot }>());
export const scheduleAppointmentsSuccess = createAction('[Appointments] Schedule appointments success');

// UI
export const setDrawer = createAction('[Appointments] Set Drawer', props<{ openDrawer: boolean }>());
