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
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [ReactiveFormsModule, AsyncPipe],
  templateUrl: './todo.component.html',
})
export class TodoComponent {
  taskForm: FormGroup;
  username$: Observable<string>;

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private taskService: TaskService
  ) {
    this.taskForm = new FormGroup({
      task: new FormControl('', [Validators.required]),
      id: new FormControl(''),
    });

    this.username$ = store.select(selectUser);
  }

  get tasks() {
    return this.taskService.getTasks();
  }

  get completedTasks() {
    return this.taskService.getCompletedTasks();
  }

  submit() {
    if (this.taskForm.valid) {
      const { task } = this.taskForm.value;
      this.taskService.addTask(task);
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
    this.taskService.deleteTask(id);
  }

  logout() {
    this.store.dispatch(logout());
    this.router.navigate(['']);
  }
}
