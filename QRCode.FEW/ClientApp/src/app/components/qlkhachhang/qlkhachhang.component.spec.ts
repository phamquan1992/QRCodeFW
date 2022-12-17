import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QlkhachhangComponent } from './qlkhachhang.component';

describe('QlkhachhangComponent', () => {
  let component: QlkhachhangComponent;
  let fixture: ComponentFixture<QlkhachhangComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QlkhachhangComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QlkhachhangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
