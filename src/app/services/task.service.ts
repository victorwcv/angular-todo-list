import { Injectable } from '@angular/core';

interface Task {
  task: string;
  id: string;
  completed: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasks: Task[] = [
    { task: 'Tarea por hacer 1', id: crypto.randomUUID(), completed: false },
    { task: 'Tarea por hacer 2', id: crypto.randomUUID(), completed: true },
    { task: 'Tarea por hacer 3', id: crypto.randomUUID(), completed: false },
  ];

  getTasks(): Task[] {
    return this.tasks;
  }

  addTask(task: string): void {
    this.tasks.push({
      task,
      id: crypto.randomUUID(),
      completed: false,
    });
  }

  deleteTask(id: string): void {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  getCompletedTasks(): Task[] {
    return this.tasks.filter((task) => task.completed);
  }
}
