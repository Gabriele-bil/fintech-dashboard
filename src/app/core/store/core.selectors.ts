import { createFeatureSelector, createSelector } from "@ngrx/store";
import { coreFeatureKey, CoreState } from "./core.reducer";

export const getCoreFeature = createFeatureSelector<CoreState>(coreFeatureKey);

export const getLoading$ = createSelector(
  getCoreFeature,
  ({ loading }) => loading
);

export const getTheme$ = createSelector(
  getCoreFeature,
  ({ theme }) => theme
);
