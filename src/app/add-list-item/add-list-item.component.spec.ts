import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddListItemComponent } from './add-list-item.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('AddListItemComponent', () => {
  let component: AddListItemComponent;
  let fixture: ComponentFixture<AddListItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [AddListItemComponent]
    });
    fixture = TestBed.createComponent(AddListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
