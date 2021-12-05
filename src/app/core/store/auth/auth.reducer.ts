import { User } from "src/app/models/user.model";
import { createReducer, on } from "@ngrx/store";
import { clearUser, setUser } from "./auth.actions";

export const authFeatureKey = 'auth';

export interface AuthState {
  user: User | null
}

export const initialState: AuthState = {
  user: null
}

export const authReducer = createReducer(
  initialState,
  on(setUser, (state, { user }) => ({ ...state, user })),
  on(clearUser, (state) => ({ ...state, user: initialState.user })),
);
