import { createAction, props } from "@ngrx/store";
import { Theme } from "./core.reducer";

export const setSpinner = createAction('[Core] Set spinner', props<{ loading: boolean }>());
export const setTheme = createAction('[Core] Set theme', props<{ theme: Theme }>());
