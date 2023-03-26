import { Component, OnInit } from '@angular/core';

import { ToDoTask } from '../Models/task.model';
import { TaskService } from '../task.service';
import { EditTaskService } from './edit-task.service';

@Component({
  selector: 'app-home',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css'],
})
export class EditTaskComponent implements OnInit {
  taskToEdit!: ToDoTask;
  titleForm: string = '';
  contentForm: string = '';
  isCompleteForm: boolean = false;
  wrongFill = false;

  constructor(
    public taskService: TaskService,
    public editTaskService: EditTaskService
  ) {}
  ngOnInit(): void {
    this.taskToEdit = this.editTaskService.getTaskToEdit();

    this.titleForm = this.taskToEdit.name;
    this.contentForm = this.taskToEdit.description;
    this.isCompleteForm = this.taskToEdit.isCompleted;
  }

  Submit() {
    let newTask = new ToDoTask();

    if (this.titleForm.trim() === '' || this.contentForm.trim() === '') {
      this.wrongFill = true;
      return;
    }

    newTask.name = this.titleForm;
    newTask.description = this.contentForm;
    newTask.isCompleted = this.isCompleteForm;

    this.taskService.editTask(newTask, this.taskToEdit.id);
  }
}
