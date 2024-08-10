import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { DEFAULT_USER, DEFAULT_PASSWORD } from '../constants/auth.constants';
import { Store } from '@ngrx/store';
import { AppState } from '../states/app.state';
import { AsyncPipe } from '@angular/common';
import { login, loginFail } from '../states/form/form.actions';
import { Observable } from 'rxjs';
import { selectError } from '../states/form/form.selectors';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, AsyncPipe],
  templateUrl: './form.component.html',
})
export class FormComponent {
  loginForm: FormGroup;
  error$: Observable<string>;

  constructor(private router: Router, private store: Store<AppState>) {
    this.loginForm = this.createLoginForm();
    this.error$ = this.store.select(selectError);
  }

  private createLoginForm(): FormGroup {
    return new FormGroup({
      user: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
    const { user, password } = this.loginForm.value;
    if (this.loginForm.valid) {
      if (user === DEFAULT_USER && password === DEFAULT_PASSWORD) {
        this.store.dispatch(login(user, password));
        this.router.navigate(['tasks']);
      } else {
        this.store.dispatch(loginFail());
      }
    }
  }
}
