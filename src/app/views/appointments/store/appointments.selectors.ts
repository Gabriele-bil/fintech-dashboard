import { createFeatureSelector, createSelector } from "@ngrx/store";
import { appointmentsFeatureKey, AppointmentsState } from "./appointments.reducer";
import { Location } from "../../../models/location.model";

export const getAppointmentsFeature = createFeatureSelector<AppointmentsState>(appointmentsFeatureKey);

export const getLocations$ = createSelector(
  getAppointmentsFeature,
  ({ locations }) => locations
);

export const getLocation$ = (locationId: string) => createSelector(
  getLocations$,
  (locations: Location[]) => locations.find(l => l._id === locationId)
);

export const getSlots$ = createSelector(
  getAppointmentsFeature,
  ({ slots }) => slots
);

export const getOpenDrawer$ = createSelector(
  getAppointmentsFeature,
  ({ openDrawer }) => openDrawer
);
