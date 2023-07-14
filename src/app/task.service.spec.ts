import { TestBed } from '@angular/core/testing';
import { Task } from './model/task';

import { TaskService } from './task.service';

describe('TaskService', () => {
  let service: TaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a task', done => {
    expect(service.tasks.length).toBe(0);

    service.tasks$.subscribe(tasks=>{
      expect(tasks.length).toBe(1);
      expect(tasks.at(0)?.title).toBe('First task');
      expect(tasks.at(0)?.isCompleted).toBe(false);

      done();
    });

    service.addTask({title:'First task', isCompleted:false});
  });

  it('should return all task', () => {
    expect(service.tasks.length).toBe(0);

    service.tasks.push({title:'First task', isCompleted:false});
    service.tasks.push({title:'Second task', isCompleted:false});
    service.tasks.push({title:'Third task', isCompleted:false});

    expect(service.getTasks().length).toBe(3);
    expect(service.getTasks().at(0)?.title).toBe('First task');
    expect(service.getTasks().at(1)?.title).toBe('Second task');
    expect(service.getTasks().at(2)?.title).toBe('Third task');
  });

  it('should add a task', done => {
    expect(service.tasks.length).toBe(0);

    service.tasks$.subscribe(tasks=>{
      expect(tasks.length).toBe(3);
      expect(tasks.at(0)?.title).toBe('First task');
      expect(tasks.at(1)?.title).toBe('Second task');
      expect(tasks.at(2)?.title).toBe('Third task');

      done();
    });

    service.tasks.push({title:'First task', isCompleted:false});
    service.tasks.push({title:'Second task', isCompleted:false});
    service.addTask({title:'Third task', isCompleted:false});
  });

  it('should update a task', done => {
    const task: Task = {title:'First task', isCompleted:false};

    expect(service.tasks.length).toBe(0);
    service.tasks.push(task);
    expect(service.tasks.length).toBe(1);

    service.tasks$.subscribe(tasks=>{
      expect(tasks.at(0)).toEqual({title:'Updated task', isCompleted:true});

      done();
    });

    service.updateTask(0, {title:'Updated task', isCompleted:true});

  });

  it('should throw error on missing task list item', () => {
    expect(service.tasks.length).toBe(0);

    expect(() => service.updateTask(0, {title:'Updated task', isCompleted:true})).toThrow(Error('Task not found!'));

  });

  it('should delete a task', done => {
    const task: Task = {title:'First task', isCompleted:false};
    const task2: Task = {title:'Second task', isCompleted:false};

    expect(service.tasks.length).toBe(0);
    service.tasks.push(task);
    service.tasks.push(task2);
    expect(service.tasks.length).toBe(2);

    service.tasks$.subscribe(tasks=>{
      expect(tasks.length).toBe(1);
      expect(tasks.at(0)?.title).toBe('Second task');

      done();
    });

    service.deleteTask(0);
  });
});
