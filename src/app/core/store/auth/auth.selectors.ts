import { createFeatureSelector, createSelector } from "@ngrx/store";
import { authFeatureKey, AuthState } from "./auth.reducer";

export const getAuthFeature = createFeatureSelector<AuthState>(authFeatureKey);

export const getUser$ = createSelector(
  getAuthFeature,
  state => state.user
);
