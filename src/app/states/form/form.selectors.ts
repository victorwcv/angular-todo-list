import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';

export const selectAuthState = (state: AppState) => state.auth;

export const selectUser = createSelector(selectAuthState, ({ user }) => user);
export const selectIsLoggedIn = createSelector(selectAuthState, ({ isLoggedIn }) => isLoggedIn);
export const selectError = createSelector(selectAuthState, ({ error }) => error)