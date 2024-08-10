import { createAction } from "@ngrx/store";

export const login = createAction('[Form Component] Login', (user: string, password: string) => ({ user, password }));
export const logout = createAction('[Form Component] Logout');
export const loginFail = createAction('[Form Component] LoginFail');