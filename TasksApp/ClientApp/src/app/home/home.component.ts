import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EditTaskService } from '../edit-task/edit-task.service';
import { ToDoTask } from '../Models/task.model';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  tasks: ToDoTask[] = [];
  noTasks: boolean = false;

  constructor(
    public taskService: TaskService,
    public router: Router,
    public editTaskService: EditTaskService
  ) {}

  ngOnInit(): void {
    this.taskService.tasksUpdated.subscribe((tasks) => {
      this.tasks = tasks;

      if (tasks.length < 1) {
        this.noTasks = true;
      }
    });

    this.fetchTasks();
  }

  deleteTask(task: ToDoTask) {
    this.taskService.deleteTask(task.id);
  }

  editTask(task: ToDoTask) {
    this.editTaskService.taskToEdit = task;
    this.router.navigate(['/edit-task']);
  }

  fetchTasks() {
    this.taskService.fetchTasks();
  }

  changeTaskState(task: ToDoTask) {
    let newTask = new ToDoTask();
    newTask.description = task.description;
    newTask.name = task.name;
    newTask.isCompleted = !task.isCompleted;
    this.taskService.changeTask(task.id, newTask);
  }
}
