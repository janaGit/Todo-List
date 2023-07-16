import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Task } from '../model/task';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-add-list-item',
  templateUrl: './add-list-item.component.html',
  styleUrls: ['./add-list-item.component.scss']
})
export class AddListItemComponent {
  taskForm = this.fb.group({
    title: ['', Validators.required],
    isCompleted : false
  });

  constructor(private taskService: TaskService,private fb: FormBuilder) { }

  addTask() {
     const task = this.taskForm.value;

    if(typeof task.title === 'string'  && typeof  task.isCompleted === 'boolean'){
      this.taskService.addTask(task as Task);
    }
    this.taskForm.setValue({title:'', isCompleted:false});
  }
}
