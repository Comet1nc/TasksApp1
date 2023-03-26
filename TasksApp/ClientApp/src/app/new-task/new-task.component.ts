import { Component } from '@angular/core';

import { ToDoTask } from '../Models/task.model';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-home',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css'],
})
export class NewTaskComponent {
  titleForm: string = '';
  contentForm: string = '';
  isCompleteForm: boolean = false;
  wrongFill = false;

  constructor(public taskService: TaskService) {}

  Submit() {
    let newTask = new ToDoTask();

    if (this.titleForm.trim() === '' || this.contentForm.trim() === '') {
      this.wrongFill = true;
      return;
    }

    newTask.name = this.titleForm;
    newTask.description = this.contentForm;
    newTask.isCompleted = this.isCompleteForm;

    this.taskService.createNewTask(newTask);
  }
}
