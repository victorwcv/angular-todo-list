import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './todo.component.html',
})
export class TodoComponent {
  taskForm: FormGroup;

  tasks: { task: string; id: string; completed: boolean }[] = [
    { task: 'Tarea por hacer 1', id: crypto.randomUUID(), completed: false },
    { task: 'Tarea por hacer 2', id: crypto.randomUUID(), completed: false },
    { task: 'Tarea por hacer 3', id: crypto.randomUUID(), completed: false },
  ];

  
  constructor() {
    this.taskForm = new FormGroup({
      task: new FormControl('', [Validators.required]),
      id: new FormControl(''),
    });
  }

  get completedTasks() {
    return this.tasks.filter(task => task.completed);
  }

  onSubmit() {
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
}
