import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { ToDoTask } from './Models/task.model';

@Injectable({ providedIn: 'root' })
export class TaskService {
  tasks: ToDoTask[] = [];
  tasksUpdated = new Subject<ToDoTask[]>();

  constructor(
    public http: HttpClient,
    @Inject('BASE_URL') public baseUrl: string,
    public authService: AuthService,
    public router: Router
  ) {}

  getTasks() {
    return this.tasks;
  }

  fetchTasks() {
    this.http.get<ToDoTask[]>(this.baseUrl + 'api/task').subscribe(
      (result) => {
        this.tasks = result;
        this.tasksUpdated.next(this.tasks);
      },
      (error) => console.error(error)
    );
  }

  changeTask(id: number, newTask: ToDoTask) {
    this.http
      .put(
        this.baseUrl + 'api/task/' + id.toString(),
        {
          Name: newTask.name,
          Description: newTask.description,
          IsCompleted: newTask.isCompleted,
        },
        {
          headers: {
            Authorization: 'Bearer ' + this.authService.token,
          },
        }
      )
      .subscribe(
        (result) => {
          this.fetchTasks();
        },
        (error) => console.error(error)
      );
  }

  createNewTask(newTask: ToDoTask) {
    this.http
      .post(
        this.baseUrl + 'api/task/',
        {
          Name: newTask.name,
          Description: newTask.description,
          IsCompleted: newTask.isCompleted,
        },
        {
          headers: {
            Authorization: 'Bearer ' + this.authService.token,
          },
        }
      )
      .subscribe(
        (result) => {
          this.fetchTasks();
          this.router.navigate(['/']);
        },
        (error) => console.error(error)
      );
  }

  editTask(newTask: ToDoTask, id: number) {
    this.http
      .put(
        this.baseUrl + 'api/task/' + id.toString(),
        {
          Name: newTask.name,
          Description: newTask.description,
          IsCompleted: newTask.isCompleted,
        },
        {
          headers: {
            Authorization: 'Bearer ' + this.authService.token,
          },
        }
      )
      .subscribe(
        (result) => {
          this.fetchTasks();
          this.router.navigate(['/']);
        },
        (error) => console.error(error)
      );
  }

  deleteTask(id: number) {
    this.http
      .delete(this.baseUrl + 'api/task/' + id.toString(), {
        headers: {
          Authorization: 'Bearer ' + this.authService.token,
        },
      })
      .subscribe(
        (result) => {
          this.fetchTasks();
        },
        (error) => console.error(error)
      );
  }
}
