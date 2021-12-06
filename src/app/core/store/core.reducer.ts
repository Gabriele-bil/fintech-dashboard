import { createReducer, on } from "@ngrx/store";
import { setSpinner, setTheme } from "./core.actions";

export const coreFeatureKey = 'core';

export type Theme = 'light-theme' | 'dark-theme';

export interface CoreState {
  loading: boolean;
  theme: Theme;
}

export const initialState: CoreState = {
  loading: false,
  theme: "dark-theme"
}

export const coreReducer = createReducer(
  initialState,
  on(setSpinner, (state, { loading }) => ({ ...state, loading })),
  on(setTheme, (state, { theme }) => ({ ...state, theme }))
);
