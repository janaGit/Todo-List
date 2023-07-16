import { Injectable, OnInit } from '@angular/core';
import { Task } from './model/task';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  tasks: Task[] = [];
  tasksSource = new Subject <Task[]>;
  tasks$ = this.tasksSource.asObservable();

  constructor() {
    const tasksFromLocalStorage = localStorage.getItem('tasks');

    if(tasksFromLocalStorage !== null) {
      this.tasks = JSON.parse(tasksFromLocalStorage);
    }
}



  getTasks() {
    return this.tasks;
  }

  addTask(task: Task) {
    this.tasks.push(task);
    this.updateTasks();
  }

  updateTask(index:number,updatedTask: Task) {
    let task = this.tasks.at(index);

    if(task === undefined) {
      throw new Error('Task not found!');
    }else{
      task.title = updatedTask.title;
      task.isCompleted = updatedTask.isCompleted;
    }
    this.updateTasks();
  }

  deleteTask(index: number) {
    this.tasks.splice(index, 1);
    this.updateTasks();
  }

  updateTasks() {
    this.tasksSource.next(this.tasks);
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }
}
