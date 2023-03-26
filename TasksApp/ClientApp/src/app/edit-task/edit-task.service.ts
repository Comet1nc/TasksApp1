import { Injectable } from '@angular/core';
import { ToDoTask } from '../Models/task.model';

@Injectable({ providedIn: 'root' })
export class EditTaskService {
  taskToEdit!: ToDoTask;

  getTaskToEdit() {
    return this.taskToEdit;
  }
}
