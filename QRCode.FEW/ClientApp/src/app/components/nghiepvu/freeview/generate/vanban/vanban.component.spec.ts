import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VanbanComponent } from './vanban.component';

describe('VanbanComponent', () => {
  let component: VanbanComponent;
  let fixture: ComponentFixture<VanbanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VanbanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VanbanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
