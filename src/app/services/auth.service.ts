import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { AppState } from '../states/app.state';
import { login, loginFail } from '../states/form/form.actions';
import { DEFAULT_USER, DEFAULT_PASSWORD } from '../constants/auth.constants';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private store: Store<AppState>, private router: Router) {}

  authenticate(user: string, password: string): void {
    if (user === DEFAULT_USER && password === DEFAULT_PASSWORD) {
      this.store.dispatch(login(user, password));
      this.router.navigate(['tasks']);
    } else {
      this.store.dispatch(loginFail());
    } 
  } 
}
