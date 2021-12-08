import { Location } from "src/app/models/location.model";
import { DayWithSlots } from "../../../models/day-with-slots.model";
import { createReducer, on } from "@ngrx/store";
import { resetSlotsForLocation, setAllLocationsSuccess, setSlotsForLocationSuccess } from "./appointments.actions";

export const appointmentsFeatureKey = 'appointments';

export interface AppointmentsState {
  locations: Location[];
  slots: DayWithSlots[] | null;
}

export const initialState: AppointmentsState = {
  locations: [],
  slots: null
}

export const appointmentsReducer = createReducer(
  initialState,
  on(setAllLocationsSuccess, (state, { locations }) => ({ ...state, locations })),
  on(setSlotsForLocationSuccess, (state, { slots }) => ({ ...state, slots })),
  on(resetSlotsForLocation, state => ({ ...state, slots: initialState.slots })),
)
