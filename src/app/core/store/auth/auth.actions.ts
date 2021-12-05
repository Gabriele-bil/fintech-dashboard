import { createAction, props } from "@ngrx/store";
import { User } from "src/app/models/user.model";
import { Credentials } from "src/app/models/credentials.model";

export const login = createAction('[Auth] Login', props<{ email: string, password: string }>());

export const signup = createAction('[Auth] Signup', props<{ credentials: Credentials }>());

export const setUser = createAction('[Auth] Set user', props<{ user: User }>());

export const logout = createAction('[Auth] Logout');

export const getCurrentUser = createAction('[Auth] Get current user');
export const clearUser = createAction('[Auth] Clear user');

