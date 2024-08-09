import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { DEFAULT_USER, DEFAULT_PASSWORD } from '../constants/auth.constants';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form.component.html',
})
export class FormComponent {
  loginForm: FormGroup;

  constructor(private router: Router) {
    this.loginForm = new FormGroup({
      user: new FormControl('', [Validators.required, Validators.minLength(3)]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  onSubmit() {
    const { user, password } = this.loginForm.value;
    if (this.loginForm.valid) {
      if (user === DEFAULT_USER && password === DEFAULT_PASSWORD) {
        console.log('User: ', user, '| Password: ', password);
        alert('Login correcto');
        this.router.navigate(['tasks']);
      } else {
        alert('Usuario o contrasena incorrectos');
      }
    }
  }
}
