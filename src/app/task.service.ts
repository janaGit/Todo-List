import { Injectable } from '@angular/core';
import { Task } from './model/task';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  tasks: Task[] = [];
  tasksSource = new Subject <Task[]>;
  tasks$ = this.tasksSource.asObservable();

  constructor() { }

  getTasks() {
    return this.tasks;
  }

  addTask(task: Task) {
    this.tasks.push(task);
    this.tasksSource.next(this.tasks);
  }

  updateTask(index:number,updatedTask: Task) {
    let task = this.tasks.at(index);

    if(task === undefined) {
      throw new Error('Task not found!');
    }else{
      task.title = updatedTask.title;
      task.isCompleted = updatedTask.isCompleted;
    }
    this.tasksSource.next(this.tasks);
  }

  deleteTask(index: number) {
    this.tasks.splice(index, 1);
    this.tasksSource.next(this.tasks);
  }

}
