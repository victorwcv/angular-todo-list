import { Routes } from '@angular/router';
import { FormComponent } from './form/form.component';
import { TodoComponent } from './todo/todo.component';
import { AuthGuard, LoginGuard } from './app.guard';

export const routes: Routes = [
  {
    path: '',
    component: FormComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'tasks',
    component: TodoComponent,
    canActivate: [AuthGuard],
  },
];