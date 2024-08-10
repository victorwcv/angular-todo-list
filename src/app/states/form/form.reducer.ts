import { createReducer, on } from '@ngrx/store';
import { login, logout, loginFail } from './form.actions';

const ERROR_CREDENTIALS = 'Usuario o contrasena incorrectos';

export interface UserState {
  user: string;
  password: string;
  isLoggedIn: boolean;
  error: string;
}

export const initialUserState: UserState = {
  user: '',
  password: '',
  isLoggedIn: false,
  error: '',
};

export const userReducer = createReducer(
  initialUserState,
  on(login, (state, { user, password }) => ({
    ...state,
    isLoggedIn: true,
    user,
    password,
    error: '',
  })),
  on(logout, (state) => ({
    ...state,
    isLoggedIn: false,
    user: '',
    password: '',
    error: '',
  })),
  on(loginFail, (state) => ({
    ...state,
    error: ERROR_CREDENTIALS,
  }))
);
