import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrmobileComponent } from './qrmobile.component';

describe('QrmobileComponent', () => {
  let component: QrmobileComponent;
  let fixture: ComponentFixture<QrmobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QrmobileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QrmobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
