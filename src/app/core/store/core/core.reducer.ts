import { createReducer, on } from "@ngrx/store";
import { setSpinner } from "./core.actions";

export const coreFeatureKey = 'core';

export interface CoreState {
  loading: boolean;
}

export const initialState: CoreState = {
  loading: false
}

export const coreReducer = createReducer(
  initialState,
  on(setSpinner, (state, { loading }) => ({ ...state, loading }))
);
