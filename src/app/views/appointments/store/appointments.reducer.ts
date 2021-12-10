import { Location } from "src/app/models/location.model";
import { DayWithSlots } from "../../../models/day-with-slots.model";
import { createReducer, on } from "@ngrx/store";
import {
  resetSlotsForLocation,
  selectLocation,
  setAllLocationsSuccess, setDrawer,
  setSlotsForLocationSuccess
} from "./appointments.actions";

export const appointmentsFeatureKey = 'appointments';

export interface AppointmentsState {
  locations: Location[];
  slots: DayWithSlots[] | null;
  openDrawer: boolean;
}

export const initialState: AppointmentsState = {
  locations: [],
  slots: null,
  openDrawer: false
}

export const appointmentsReducer = createReducer(
  initialState,
  on(setAllLocationsSuccess, (state, { locations }) => ({ ...state, locations })),
  on(setSlotsForLocationSuccess, (state, { slots }) => ({ ...state, slots })),
  on(resetSlotsForLocation, state => ({ ...state, slots: initialState.slots })),
  on(selectLocation, state => ({ ...state, openDrawer: true })),
  on(setDrawer, (state, { openDrawer }) => ({ ...state, openDrawer }))
);
