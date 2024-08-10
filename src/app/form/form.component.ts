import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../states/app.state';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { selectError } from '../states/form/form.selectors';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, AsyncPipe],
  templateUrl: './form.component.html',
})
export class FormComponent {
  loginForm: FormGroup;
  error$: Observable<string>;
  submitted = false;

  constructor(
    private store: Store<AppState>,
    private authService: AuthService
  ) {
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
    this.submitted = true;
    if (this.loginForm.valid) {
      const { user, password } = this.loginForm.value;
      this.authService.authenticate(user, password);
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}

