import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Task } from '../model/task';
import { TaskService } from '../task.service';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

@Component({
  selector: 'app-list-item',
  animations: [
    trigger('newTask', [
      transition('* => new', [
        animate('1s', keyframes([
          style({ backgroundColor: 'orange' , offset: 0.5})
        ]))
    ])
  ])],
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent {
  taskForm = this.fb.group({
    title: ['', Validators.required],
    isCompleted : false,
    isNew: false
  });

  @Input()
  get task(): Task { return this._task;}
  set task(task: Task) {
    this._task = task;
    this.taskForm.setValue(task);
  }
  private _task:Task = {title:'', isCompleted: false, isNew: false};

  @Output() updateTask = new EventEmitter<Task>();
  @Output() deleteTask = new EventEmitter<Task>();

  titleSubscription: Subscription;

  constructor(private taskService: TaskService,private fb: FormBuilder) {
    this.titleSubscription = this.taskForm.valueChanges.subscribe(task => {
      if(typeof task.title === 'string'  && typeof  task.isCompleted === 'boolean' &&  task.isNew === false){
         this.updateTask.emit({title:task.title,isCompleted:task.isCompleted, isNew:task.isNew});
      }
    });
 }

 onClickDelete() {
  this.deleteTask.emit(this.task);
 }

 onFinishAnimation(){
  this._task.isNew = false;
  this.taskForm.setValue(this.task);
 }

 ngOnDestroy() {
  this.titleSubscription.unsubscribe();
}


}
