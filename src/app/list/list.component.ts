import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { Task } from '../model/task';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnDestroy{

  tasks:Task[] = [];
  tasksSubscription: Subscription;

  constructor(private taskService: TaskService) {
    this.tasksSubscription = taskService.tasks$.subscribe(tasks=>{
      this.tasks = tasks;
    });
  }

  updateTask(index: number, task: Task) {
    this.taskService.updateTask(index, task);
  }

  deleteTask(index: number) {
    this.taskService.deleteTask(index);
  }

  ngOnDestroy() {
    this.tasksSubscription.unsubscribe();
  }

}
