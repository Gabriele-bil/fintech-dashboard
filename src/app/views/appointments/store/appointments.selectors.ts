import { createFeatureSelector, createSelector } from "@ngrx/store";
import { appointmentsFeatureKey, AppointmentsState } from "./appointments.reducer";
import { Location } from "../../../models/location.model";

export const getAppointmentsFeature = createFeatureSelector<AppointmentsState>(appointmentsFeatureKey);

export const getLocations$ = createSelector(
  getAppointmentsFeature,
  ({ locations }) => locations
);

export const getLocation$ = createSelector(
  getLocations$,
  (locations: Location[], locationId: string) => locations.find(l => l._id === locationId)
);

export const getSlots$ = createSelector(
  getAppointmentsFeature,
  ({ slots }) => slots
);
