import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviewComponent } from './proview.component';

describe('ProviewComponent', () => {
  let component: ProviewComponent;
  let fixture: ComponentFixture<ProviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
