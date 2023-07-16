import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Task } from '../model/task';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent {
  taskForm = this.fb.group({
    title: ['', Validators.required],
    isCompleted : false
  });

  @Input()
  get task(): Task { return this._task;}
  set task(task: Task) {
    this._task = task;
    this.taskForm.setValue(task);
  }
  private _task:Task = {title:'', isCompleted: false};

  @Output() updateTask = new EventEmitter<Task>();
  @Output() deleteTask = new EventEmitter<Task>();

  titleSubscription: Subscription;

  constructor(private taskService: TaskService,private fb: FormBuilder) {
    this.titleSubscription = this.taskForm.valueChanges.subscribe(task => {
      if(typeof task.title === 'string'  && typeof  task.isCompleted === 'boolean'){
         this.updateTask.emit(task as Task);
      }
    });
 }

 onClickDelete() {
  this.deleteTask.emit(this.task);
 }

 ngOnDestroy() {
  this.titleSubscription.unsubscribe();
}


}
