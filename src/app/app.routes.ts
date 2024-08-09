import { Routes } from '@angular/router';
import { FormComponent } from './form/form.component';
import { TodoComponent } from './todo/todo.component';

export const routes: Routes = [{
  path: '',
  component: FormComponent
}, {
  path: 'tasks',
  component: TodoComponent
}];
