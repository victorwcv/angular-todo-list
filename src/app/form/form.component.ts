import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form.component.html',
})

export class FormComponent {
  loginForm: FormGroup;

  USUARIO = 'test01';
  CONTRASENA = 'test01';

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
      if (user === this.USUARIO && password === this.CONTRASENA) {
        console.log('User: ', user, '| Password: ', password);
        alert('Login correcto');
        this.router.navigate(['tasks']);
      } else {
        alert('Usuario o contrasena incorrectos');
      }
    }
  }
}
