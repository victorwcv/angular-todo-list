import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../states/app.state';
import { selectUser } from '../states/form/form.selectors';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { logout } from '../states/form/form.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [ReactiveFormsModule, AsyncPipe],
  templateUrl: './todo.component.html',
})
export class TodoComponent {
  taskForm: FormGroup;
  username$: Observable<string>;

  tasks: { task: string; id: string; completed: boolean }[] = [
    { task: 'Tarea por hacer 1', id: crypto.randomUUID(), completed: false },
    { task: 'Tarea por hacer 2', id: crypto.randomUUID(), completed: true },
    { task: 'Tarea por hacer 3', id: crypto.randomUUID(), completed: false },
  ];

  constructor(private store: Store<AppState>, private router: Router) {
    this.taskForm = new FormGroup({
      task: new FormControl('', [Validators.required]),
      id: new FormControl(''),
    });

    this.username$ = store.select(selectUser);
  }

  get completedTasks() {
    return this.tasks.filter((task) => task.completed);
  }

  submit() {
    if (this.taskForm.valid) {
      this.tasks.push({
        task: this.taskForm.value.task,
        id: crypto.randomUUID(),
        completed: false,
      });
      console.log(this.tasks);

      this.taskForm.reset();
    }
  }

  onKeyPress(event: KeyboardEvent) {
    const regex = /^[a-zA-Z0-9ñÑáéíóúÁÉÍÓÚ ]+$/;
    const key = event.key;
    if (!regex.test(key)) {
      event.preventDefault();
    }
  }

  deleteTask(id: string) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  logout() {
    this.store.dispatch(logout());
    this.router.navigate(['']);
  }
}
