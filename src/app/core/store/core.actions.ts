import { createAction, props } from "@ngrx/store";

export const setSpinner = createAction('[Core] Set spinner', props<{ loading: boolean }>());
